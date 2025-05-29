import { type NextRequest, NextResponse } from "next/server"
import { sendEmailWithResend } from "@/lib/resend-email"
import { generateAssessmentPDF } from "@/lib/pdf-generator"
import type { AssessmentData } from "@/types"

export async function POST(request: NextRequest) {
  console.log("=== API SUBMISSION START ===")

  try {
    // Parse the request body
    const body = await request.json()
    console.log("Request body received:", {
      name: body.name,
      email: body.email,
      answersCount: Object.keys(body.answers || {}).length,
      timeTakenCount: Object.keys(body.timeTaken || {}).length,
      hasDeviceFingerprint: !!body.deviceFingerprint,
    })

    // Validate required fields
    if (!body.name || !body.email || !body.answers) {
      console.error("Missing required fields:", { name: !!body.name, email: !!body.email, answers: !!body.answers })
      return NextResponse.json({ error: "Naam, email en antwoorden zijn verplicht" }, { status: 400 })
    }

    // Create assessment data object
    const assessmentData: AssessmentData = {
      name: body.name,
      email: body.email,
      timestamp: new Date().toISOString(),
      answers: body.answers,
      timeTaken: body.timeTaken || {},
      deviceFingerprint: body.deviceFingerprint || "",
    }

    console.log("Assessment data prepared:", {
      name: assessmentData.name,
      email: assessmentData.email,
      timestamp: assessmentData.timestamp,
      answersCount: Object.keys(assessmentData.answers).length,
    })

    // Check environment variables for email capability
    const hasResendKey = !!process.env.RESEND_API_KEY
    const hasEmailConfig = !!(
      process.env.EMAIL_SERVER_HOST &&
      process.env.EMAIL_SERVER_USER &&
      process.env.EMAIL_SERVER_PASSWORD
    )
    const canSendEmail = hasResendKey || hasEmailConfig

    console.log("Email capability check:", {
      hasResendKey,
      hasEmailConfig,
      canSendEmail,
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    })

    // Generate PDF report
    console.log("Generating PDF report...")
    let pdfBuffer: Buffer | null = null
    try {
      pdfBuffer = await generateAssessmentPDF(assessmentData)
      console.log("PDF generated successfully, size:", pdfBuffer.length, "bytes")
    } catch (pdfError) {
      console.error("PDF generation failed:", pdfError)
      // Continue without PDF - don't fail the entire submission
    }

    let emailResult = { success: false, error: "Email not attempted" }

    // Always try to send email if we have the capability
    if (canSendEmail) {
      // Prepare simplified email content
      const emailSubject = `Assessment Resultaten: ${assessmentData.name}`

      const emailText = `
Beste BouwerPower team,

De assessment resultaten van ${assessmentData.name} zijn beschikbaar!

Kandidaat informatie:
- Naam: ${assessmentData.name}
- Email: ${assessmentData.email}
- Datum: ${new Date(assessmentData.timestamp).toLocaleString("nl-NL")}
- Aantal beantwoorde vragen: ${Object.keys(assessmentData.answers).length}

${pdfBuffer ? "Het volledige rapport met analyse en aanbevelingen is bijgevoegd als PDF." : "PDF rapport kon niet worden gegenereerd."}

Met vriendelijke groet,
BouwerPower Assessment Systeem
      `

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #2d5c88; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">BouwerPower Assessment</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f8f9fa;">
            <h2 style="color: #2d5c88;">Assessment Resultaten Beschikbaar</h2>
            
            <p>Beste BouwerPower team,</p>
            
            <p>De assessment resultaten van <strong>${assessmentData.name}</strong> zijn beschikbaar!</p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #2d5c88; margin-top: 0;">Kandidaat Informatie</h3>
              <ul style="list-style: none; padding: 0;">
                <li><strong>Naam:</strong> ${assessmentData.name}</li>
                <li><strong>Email:</strong> ${assessmentData.email}</li>
                <li><strong>Datum:</strong> ${new Date(assessmentData.timestamp).toLocaleString("nl-NL")}</li>
                <li><strong>Aantal beantwoorde vragen:</strong> ${Object.keys(assessmentData.answers).length}</li>
              </ul>
            </div>
            
            ${
              pdfBuffer
                ? '<p style="background-color: #d4edda; padding: 10px; border-radius: 5px; color: #155724;">📎 Het volledige rapport met analyse en aanbevelingen is bijgevoegd als PDF.</p>'
                : '<p style="background-color: #f8d7da; padding: 10px; border-radius: 5px; color: #721c24;">⚠️ PDF rapport kon niet worden gegenereerd.</p>'
            }
            
            <p>Met vriendelijke groet,<br>
            <strong>BouwerPower Assessment Systeem</strong></p>
          </div>
          
          <div style="background-color: #6c757d; color: white; padding: 10px; text-align: center; font-size: 12px;">
            Gegenereerd op ${new Date().toLocaleString("nl-NL")} | Vertrouwelijk document
          </div>
        </div>
      `

      // Prepare attachments
      const attachments = []
      if (pdfBuffer) {
        attachments.push({
          filename: `Assessment_${assessmentData.name.replace(/[^a-zA-Z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        })
      }

      // Send email
      console.log("Attempting to send email...")
      const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"

      // First try with Resend if available
      if (hasResendKey) {
        console.log("Attempting to send email via Resend...")
        emailResult = await sendEmailWithResend(recipientEmail, emailSubject, emailText, emailHtml, attachments)
        console.log("Resend result:", emailResult)
      }

      // If Resend fails or is not available, try with simple email as fallback
      if (!emailResult.success && hasEmailConfig) {
        console.log("Resend failed or not available, trying fallback email method...")
        try {
          const { sendSimpleEmail } = await import("@/lib/simple-email")
          emailResult = await sendSimpleEmail(recipientEmail, emailSubject, emailText, emailHtml, attachments)
          console.log("Fallback email result:", emailResult)
        } catch (fallbackError) {
          console.error("Fallback email method also failed:", fallbackError)
          emailResult = {
            success: false,
            error: `Fallback failed: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
          }
        }
      }

      console.log("Final email result:", emailResult)
    } else {
      console.log("No email configuration available - skipping email sending")
      emailResult = {
        success: false,
        error: "No email configuration available (missing RESEND_API_KEY or email server settings)",
      }
    }

    // Return success response with email status
    const response = {
      success: true,
      message: emailResult.success
        ? "Assessment succesvol verzonden en email verstuurd"
        : "Assessment succesvol ontvangen",
      emailSent: emailResult.success,
      pdfGenerated: !!pdfBuffer,
      pdfAttached: emailResult.success && !!pdfBuffer,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        hasResendKey,
        hasEmailConfig,
        canSendEmail,
      },
    }

    // Add warning if email failed
    if (!emailResult.success) {
      response.warning = `Email kon niet worden verzonden: ${emailResult.error}`
    }

    console.log("Returning response:", response)
    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in submit-assessment API:", error)

    // Provide more specific error information
    let errorMessage = "Er is een onbekende fout opgetreden"

    if (error instanceof Error) {
      errorMessage = error.message

      // Check for specific error types
      if (error.message.includes("JSON")) {
        errorMessage = "Ongeldige data ontvangen"
      } else if (error.message.includes("timeout")) {
        errorMessage = "Verzoek duurde te lang"
      } else if (error.message.includes("network")) {
        errorMessage = "Netwerkfout"
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : String(error),
        success: false,
      },
      { status: 500 },
    )
  } finally {
    console.log("=== API SUBMISSION END ===")
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
