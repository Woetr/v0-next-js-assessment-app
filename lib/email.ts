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
  console.log("Starting email sending process...")
  console.log("Environment check:", {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    hasEmailHost: !!process.env.EMAIL_SERVER_HOST,
    hasEmailUser: !!process.env.EMAIL_SERVER_USER,
    hasEmailPassword: !!process.env.EMAIL_SERVER_PASSWORD,
    hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
  })

  // Format raw answers for email - limit to prevent oversized emails
  const formattedAnswers = Object.entries(submission.answers)
    .slice(0, 100) // Limit to first 100 answers if there are more
    .map(([questionId, optionId]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      const option = question?.options.find((o) => o.id === optionId)

      return question && option
        ? `Vraag ${questionId}: ${question.text}\nAntwoord: ${option.text}\n`
        : `Vraag ${questionId}: Onbekend antwoord (${optionId})\n`
    })
    .join("\n")

  // Prepare email content - keep it concise
  const emailContent = `
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

  // Check if we're in a development/preview environment
  const isDevelopment = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

  if (isDevelopment) {
    console.log("Development/Preview environment detected. Email would be sent with the following content:")
    console.log(emailContent.substring(0, 500) + "...") // Log only first 500 chars to prevent log overflow
    return {
      success: true,
      messageId: "preview-mock-id",
      note: "Email sending skipped in development/preview environment",
    }
  }

  // Check if email configuration is available
  if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    const missingVars = []
    if (!process.env.EMAIL_SERVER_HOST) missingVars.push("EMAIL_SERVER_HOST")
    if (!process.env.EMAIL_SERVER_USER) missingVars.push("EMAIL_SERVER_USER")
    if (!process.env.EMAIL_SERVER_PASSWORD) missingVars.push("EMAIL_SERVER_PASSWORD")

    console.error("Missing email configuration:", missingVars)
    return {
      success: false,
      error: `Email configuration missing: ${missingVars.join(", ")}`,
    }
  }

  try {
    console.log("Attempting to import nodemailer...")
    // Dynamisch importeren van nodemailer alleen in productie
    const nodemailer = await import("nodemailer")
    console.log("Nodemailer imported successfully")

    console.log("Creating email transporter...")
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
      // Add timeout settings
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 15000, // 15 seconds
      socketTimeout: 30000, // 30 seconds
    })

    console.log("Verifying SMTP connection...")
    // Verify the connection with timeout
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("SMTP verification timeout")), 15000)),
    ])
    console.log("SMTP connection verified successfully")

    const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"
    console.log("Sending email to:", recipientEmail)

    // Create a simplified HTML version with less data to prevent size issues
    const htmlContent = `
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

    // Send email with timeout
    const info = await Promise.race([
      transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
        to: recipientEmail,
        subject: `Assessment Resultaten: ${submission.name}`,
        text: emailContent,
        html: htmlContent,
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Email sending timeout")), 20000)),
    ])

    console.log("Email sent successfully:", info.messageId)
    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    }
  } catch (error) {
    console.error("Failed to send email:", error)

    // Provide more specific error messages
    let errorMessage = "Onbekende fout"
    if (error instanceof Error) {
      errorMessage = error.message

      // Check for common error types
      if (error.message.includes("ETIMEDOUT") || error.message.includes("timeout")) {
        errorMessage = "Verbinding time-out - controleer je internetverbinding en e-mailserver instellingen"
      } else if (error.message.includes("ENOTFOUND")) {
        errorMessage = "E-mailserver niet gevonden - controleer EMAIL_SERVER_HOST"
      } else if (error.message.includes("535") || error.message.includes("authentication")) {
        errorMessage = "Authenticatie mislukt - controleer EMAIL_SERVER_USER en EMAIL_SERVER_PASSWORD"
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Verbinding geweigerd - controleer EMAIL_SERVER_PORT"
      }
    }

    return {
      success: false,
      error: errorMessage,
      originalError: error instanceof Error ? error.message : String(error),
    }
  }
}
