import { NextResponse } from "next/server"
import { generateAssessmentPDF } from "@/lib/pdf-generator"
import { questions } from "@/data/questions"

export async function POST(request: Request) {
  console.log("=== ASSESSMENT SUBMISSION START ===")
  console.log("Timestamp:", new Date().toISOString())

  try {
    const { name, email, answers, timeTaken, deviceFingerprint } = await request.json()

    console.log("Submission data received:", {
      name,
      email,
      answersCount: Object.keys(answers || {}).length,
      hasTimeTaken: !!timeTaken,
      hasDeviceFingerprint: !!deviceFingerprint,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
      },
    })

    if (!name || !email || !answers) {
      console.error("Missing required fields:", { name: !!name, email: !!email, answers: !!answers })
      return NextResponse.json({ error: "Verplichte velden ontbreken" }, { status: 400 })
    }

    // Bereid resultaten voor
    const submission = {
      name,
      email,
      timestamp: new Date().toISOString(),
      answers,
      timeTaken,
      deviceFingerprint,
    }

    console.log("Generating PDF report...")

    // Genereer PDF rapport
    let pdfBuffer: Buffer | null = null
    try {
      pdfBuffer = await generateAssessmentPDF(submission)
      console.log("PDF generated successfully, size:", pdfBuffer.length, "bytes")
    } catch (pdfError) {
      console.error("Failed to generate PDF:", pdfError)
      // Continue without PDF if generation fails
    }

    console.log("Processing submission for environment:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      hasPDF: !!pdfBuffer,
    })

    // Format raw answers for email
    console.log("Formatting answers...")
    const formattedAnswers = Object.entries(submission.answers)
      .slice(0, 50) // Limit to prevent email size issues
      .map(([questionId, optionId]) => {
        const question = questions.find((q) => q.id === Number.parseInt(questionId))
        const option = question?.options.find((o) => o.id === optionId)

        return question && option
          ? `Vraag ${questionId}: ${question.text}\nAntwoord: ${option.text}\n`
          : `Vraag ${questionId}: Onbekend antwoord (${optionId})\n`
      })
      .join("\n")

    console.log("Formatted answers length:", formattedAnswers.length)

    // Prepare email content
    const emailSubject = `Assessment Resultaten: ${submission.name}`
    const emailText = `
Assessment Resultaten voor ${submission.name} (${submission.email})
Ingediend op: ${new Date(submission.timestamp).toLocaleString("nl-NL")}
Omgeving: ${process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown"}

${pdfBuffer ? "Een gedetailleerd PDF rapport is bijgevoegd met volledige analyse." : "PDF rapport kon niet worden gegenereerd."}

RUWE ANTWOORDEN (eerste 50):
${formattedAnswers}

TIJDSINFORMATIE:
${
  submission.timeTaken
    ? Object.entries(submission.timeTaken)
        .slice(0, 20)
        .map(([qId, time]) => `Vraag ${qId}: ${time} seconden`)
        .join("\n")
    : "Geen tijdsinformatie beschikbaar"
}

DEVICE FINGERPRINT:
${submission.deviceFingerprint ? submission.deviceFingerprint.substring(0, 100) : "Niet beschikbaar"}
    `

    // Create HTML version
    const emailHtml = `
      <h2>Assessment Resultaten voor ${submission.name}</h2>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Ingediend op:</strong> ${new Date(submission.timestamp).toLocaleString("nl-NL")}</p>
      <p><strong>Omgeving:</strong> ${process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown"}</p>
      
      ${
        pdfBuffer
          ? '<div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0;"><strong>📄 PDF Rapport:</strong> Een gedetailleerd rapport met volledige analyse is bijgevoegd.</div>'
          : '<div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0;"><strong>⚠️ Let op:</strong> PDF rapport kon niet worden gegenereerd.</div>'
      }
      
      <h3>Ruwe Antwoorden (eerste 50):</h3>
      <div style="font-family: monospace; white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px; max-height: 300px; overflow-y: auto;">
${formattedAnswers}
      </div>
      
      ${
        submission.timeTaken
          ? `
      <h3>Tijdsinformatie:</h3>
      <ul>
        ${Object.entries(submission.timeTaken)
          .slice(0, 20)
          .map(([qId, time]) => `<li>Vraag ${qId}: ${time} seconden</li>`)
          .join("")}
      </ul>
      `
          : ""
      }
      
      <p><strong>Device Fingerprint:</strong> ${
        submission.deviceFingerprint ? submission.deviceFingerprint.substring(0, 100) : "Niet beschikbaar"
      }</p>
      
      <hr style="margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">
        Verzonden via Resend API • BouwerPower Assessment Tool
      </p>
    `

    console.log("Email content prepared, attempting to send via Resend...")

    // Send email via Resend with PDF attachment
    const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"

    // Prepare email data with attachment
    const emailData: any = {
      from: "BouwerPower Assessment <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }

    // Add PDF attachment if available
    if (pdfBuffer) {
      emailData.attachments = [
        {
          filename: `Assessment_${submission.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
          content: pdfBuffer.toString("base64"),
          type: "application/pdf",
        },
      ]
    }

    console.log("Sending email with attachment:", {
      hasAttachment: !!pdfBuffer,
      attachmentSize: pdfBuffer?.length || 0,
    })

    // Send via Resend API directly (since we need attachment support)
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing")
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailData),
    })

    const responseData = await response.json()

    console.log("Resend API response:", {
      status: response.status,
      statusText: response.statusText,
      data: responseData,
    })

    if (!response.ok) {
      console.error("Email sending failed:", responseData)
      return NextResponse.json({
        success: true,
        emailSent: false,
        warning: "Assessment is ontvangen, maar er was een probleem met het verzenden van de e-mail.",
        details: responseData.message || "Onbekende fout",
        service: "Resend",
      })
    }

    // Log assessment submission
    console.log("Assessment submitted successfully:", {
      name: submission.name,
      email: submission.email,
      timestamp: submission.timestamp,
      answersCount: Object.keys(submission.answers).length,
      emailSuccess: true,
      hasPDF: !!pdfBuffer,
      messageId: responseData.id,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    })

    // Stuur een succesvolle response
    return NextResponse.json({
      success: true,
      emailSent: true,
      message: `Assessment succesvol verzonden via Resend${pdfBuffer ? " met PDF rapport" : ""}`,
      messageId: responseData.id,
      service: "Resend",
      hasPDF: !!pdfBuffer,
    })
  } catch (error) {
    console.error("=== GENERAL ERROR IN ASSESSMENT SUBMISSION ===")
    console.error("Error type:", error?.constructor?.name)
    console.error("Error message:", error instanceof Error ? error.message : String(error))
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        error: "Fout bij verwerken van assessment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  } finally {
    console.log("=== ASSESSMENT SUBMISSION END ===")
  }
}
