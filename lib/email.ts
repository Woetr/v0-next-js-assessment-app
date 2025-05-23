import { questions } from "@/data/questions"

type AssessmentSubmission = {
  name: string
  email: string
  timestamp: string
  answers: Record<number, string>
  timeTaken?: Record<number, number>
  deviceFingerprint?: string
}

export async function sendAssessmentResults(submission: AssessmentSubmission) {
  // Format raw answers for email
  const formattedAnswers = Object.entries(submission.answers)
    .map(([questionId, optionId]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((o) => o.id === optionId)

      return question && option
        ? `Vraag ${questionId}: ${question.text}\nAntwoord: ${option.text}\n`
        : `Vraag ${questionId}: Onbekend antwoord (${optionId})\n`
    })
    .join("\n")

  // Prepare email content
  const emailContent = `
Assessment Resultaten voor ${submission.name} (${submission.email})
Ingediend op: ${new Date(submission.timestamp).toLocaleString("nl-NL")}

RUWE ANTWOORDEN:
${formattedAnswers}

TIJDSINFORMATIE:
${
  submission.timeTaken
    ? Object.entries(submission.timeTaken)
        .map(([qId, time]) => `Vraag ${qId}: ${time} seconden`)
        .join("\n")
    : "Geen tijdsinformatie beschikbaar"
}

DEVICE FINGERPRINT:
${submission.deviceFingerprint || "Niet beschikbaar"}
  `

  // Check if we're in a development/preview environment
  const isDevelopment = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

  if (isDevelopment) {
    console.log("Development/Preview environment detected. Email would be sent with the following content:")
    console.log(emailContent)
    return {
      success: true,
      messageId: "preview-mock-id",
      note: "Email sending skipped in development/preview environment",
    }
  }

  try {
    // Dynamisch importeren van nodemailer alleen in productie
    const nodemailer = await import("nodemailer")

    // Check if email configuration is available
    if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      console.warn(
        "Email configuration is missing. Required: EMAIL_SERVER_HOST, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD",
      )
      return {
        success: false,
        message:
          "Email configuration missing. Please set EMAIL_SERVER_HOST, EMAIL_SERVER_USER, and EMAIL_SERVER_PASSWORD environment variables.",
      }
    }

    // Create a transporter with your email provider settings
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number.parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      secure: process.env.EMAIL_SERVER_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      // Add some additional options for better compatibility
      tls: {
        rejectUnauthorized: false, // This helps with self-signed certificates
      },
    })

    // Verify the connection
    await transporter.verify()
    console.log("SMTP connection verified successfully")

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
      to: process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com", // Your personal email
      subject: `Assessment Resultaten: ${submission.name}`,
      text: emailContent,
      // Optional: Add HTML version for better formatting
      html: `
        <h2>Assessment Resultaten voor ${submission.name}</h2>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Ingediend op:</strong> ${new Date(submission.timestamp).toLocaleString("nl-NL")}</p>
        
        <h3>Antwoorden:</h3>
        <div style="font-family: monospace; white-space: pre-line; background: #f5f5f5; padding: 15px; border-radius: 5px;">
${formattedAnswers}
        </div>
        
        ${
          submission.timeTaken
            ? `
        <h3>Tijdsinformatie:</h3>
        <ul>
          ${Object.entries(submission.timeTaken)
            .map(([qId, time]) => `<li>Vraag ${qId}: ${time} seconden</li>`)
            .join("")}
        </ul>
        `
            : ""
        }
        
        <p><strong>Device Fingerprint:</strong> ${submission.deviceFingerprint || "Niet beschikbaar"}</p>
      `,
    })

    console.log("Email sent successfully:", info.messageId)
    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
