import { NextResponse } from "next/server"
import { mockSubmitAssessment } from "./mock"
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
      answersKeys: Object.keys(answers || {}),
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

    // Log environment info
    console.log("Environment check:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasEmailHost: !!process.env.EMAIL_SERVER_HOST,
      hasEmailUser: !!process.env.EMAIL_SERVER_USER,
      hasEmailPass: !!process.env.EMAIL_SERVER_PASSWORD,
      hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
    })

    // Check if we're in a preview environment
    const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

    if (isPreview) {
      console.log("Preview environment detected, using mock submission")
      await mockSubmitAssessment(submission)

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: "Assessment succesvol verzonden (preview mode)",
      })
    }

    console.log("Production environment detected, attempting real email send")

    // Format raw answers for email - limit to prevent oversized emails
    console.log("Formatting answers...")
    const formattedAnswers = Object.entries(submission.answers)
      .slice(0, 50) // Limit to first 50 answers to prevent oversized emails
      .map(([questionId, optionId]) => {
        const question = questions.find((q) => q.id === Number.parseInt(questionId))
        const option = question?.options.find((o) => o.id === optionId)

        return question && option
          ? `Vraag ${questionId}: ${question.text}\nAntwoord: ${option.text}\n`
          : `Vraag ${questionId}: Onbekend antwoord (${optionId})\n`
      })
      .join("\n")

    console.log("Formatted answers length:", formattedAnswers.length)

    // Prepare email content - keep it concise
    const emailSubject = `Assessment Resultaten: ${submission.name}`
    const emailText = `
Assessment Resultaten voor ${submission.name} (${submission.email})
Ingediend op: ${new Date(submission.timestamp).toLocaleString("nl-NL")}

RUWE ANTWOORDEN:
${formattedAnswers}

TIJDSINFORMATIE:
${
  submission.timeTaken
    ? Object.entries(submission.timeTaken)
        .slice(0, 20) // Limit time data
        .map(([qId, time]) => `Vraag ${qId}: ${time} seconden`)
        .join("\n")
    : "Geen tijdsinformatie beschikbaar"
}

DEVICE FINGERPRINT:
${submission.deviceFingerprint ? submission.deviceFingerprint.substring(0, 100) : "Niet beschikbaar"}
    `

    console.log("Email content prepared, length:", emailText.length)

    // Create a simplified HTML version
    const emailHtml = `
      <h2>Assessment Resultaten voor ${submission.name}</h2>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Ingediend op:</strong> ${new Date(submission.timestamp).toLocaleString("nl-NL")}</p>
      
      <h3>Antwoorden:</h3>
      <div style="font-family: monospace; white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px;">
${formattedAnswers}
      </div>
      
      <p><strong>Device Fingerprint:</strong> ${
        submission.deviceFingerprint ? submission.deviceFingerprint.substring(0, 100) : "Niet beschikbaar"
      }</p>
    `

    console.log("HTML content prepared, length:", emailHtml.length)

    console.log("Attempting to send email...")

    // Probeer e-mail te versturen met directe nodemailer implementatie
    try {
      console.log("Importing nodemailer...")
      const nodemailer = await import("nodemailer")
      console.log("Nodemailer imported successfully")

      // Check if email configuration is available
      if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        console.error("Missing email configuration")

        // Stuur toch een succesvolle response om de gebruiker niet te blokkeren
        return NextResponse.json({
          success: true,
          emailSent: false,
          warning: "Assessment is ontvangen, maar er was een probleem met de e-mailconfiguratie.",
        })
      }

      console.log("Creating transporter...")
      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
        secure: process.env.EMAIL_SERVER_PORT === "465",
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
        // Add timeout settings
        connectionTimeout: 30000,
        greetingTimeout: 15000,
        socketTimeout: 30000,
      })

      console.log("Transporter created, verifying connection...")

      // Verify connection first
      await transporter.verify()
      console.log("SMTP connection verified successfully")

      // Send email
      const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"
      console.log("Sending email to:", recipientEmail)

      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
        to: recipientEmail,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      })

      console.log("Email sent successfully!")
      console.log("Message ID:", info.messageId)
      console.log("Accepted:", info.accepted)
      console.log("Rejected:", info.rejected)

      // Log assessment submission
      console.log("Assessment submitted successfully:", {
        name: submission.name,
        email: submission.email,
        timestamp: submission.timestamp,
        answersCount: Object.keys(submission.answers).length,
        emailSuccess: true,
      })

      // Stuur een succesvolle response
      return NextResponse.json({
        success: true,
        emailSent: true,
        message: "Assessment succesvol verzonden",
        messageId: info.messageId,
      })
    } catch (emailError) {
      console.error("=== EMAIL SENDING FAILED ===")
      console.error("Error type:", emailError?.constructor?.name)
      console.error("Error message:", emailError instanceof Error ? emailError.message : String(emailError))
      console.error("Error stack:", emailError instanceof Error ? emailError.stack : "No stack trace")

      // Log assessment submission with email failure
      console.log("Assessment submitted with email failure:", {
        name: submission.name,
        email: submission.email,
        timestamp: submission.timestamp,
        answersCount: Object.keys(submission.answers).length,
        emailSuccess: false,
        emailError: emailError instanceof Error ? emailError.message : String(emailError),
      })

      // Stuur toch een succesvolle response om de gebruiker niet te blokkeren
      return NextResponse.json({
        success: true,
        emailSent: false,
        warning: "Assessment is ontvangen, maar er was een probleem met het verzenden van de e-mail.",
        details: emailError instanceof Error ? emailError.message : String(emailError),
      })
    }
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
