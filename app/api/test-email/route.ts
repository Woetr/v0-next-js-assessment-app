import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Alleen toegankelijk in development of met een geheime sleutel
    const url = new URL(request.url)
    const secret = url.searchParams.get("secret")
    const isAuthorized = process.env.NODE_ENV === "development" || secret === process.env.EMAIL_TEST_SECRET

    if (!isAuthorized) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 })
    }

    // Maak een test submission
    const testSubmission = {
      name: "Test Gebruiker",
      email: "test@example.com",
      timestamp: new Date().toISOString(),
      answers: {
        1: "1a",
        2: "2b",
        3: "3c",
      },
      timeTaken: {
        1: 15,
        2: 20,
        3: 10,
      },
      deviceFingerprint: "test-fingerprint",
    }

    // Log alle omgevingsvariabelen (zonder gevoelige informatie)
    console.log("Environment variables check:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasEmailHost: !!process.env.EMAIL_SERVER_HOST,
      hasEmailUser: !!process.env.EMAIL_SERVER_USER,
      hasEmailPass: !!process.env.EMAIL_SERVER_PASSWORD,
      hasEmailFrom: !!process.env.EMAIL_FROM,
      hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
      emailHost: process.env.EMAIL_SERVER_HOST,
      emailPort: process.env.EMAIL_SERVER_PORT,
    })

    // Probeer e-mail te versturen met directe nodemailer implementatie
    try {
      const nodemailer = await import("nodemailer")

      // Check if email configuration is available
      if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
        return NextResponse.json({
          success: false,
          error: "Email configuration missing",
          missingVars: {
            host: !process.env.EMAIL_SERVER_HOST,
            user: !process.env.EMAIL_SERVER_USER,
            pass: !process.env.EMAIL_SERVER_PASSWORD,
          },
        })
      }

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
      })

      // Send test email
      const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"
      const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
        to: recipientEmail,
        subject: "Test Email van BouwerPower Assessment",
        text: "Dit is een test e-mail om te controleren of de e-mailconfiguratie correct werkt.",
        html: "<h1>Test Email</h1><p>Dit is een test e-mail om te controleren of de e-mailconfiguratie correct werkt.</p>",
      })

      console.log("Email sent successfully:", info)

      return NextResponse.json({
        success: true,
        message: "Test e-mail succesvol verzonden",
        details: {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
        },
      })
    } catch (emailError) {
      console.error("Direct email sending failed:", emailError)

      return NextResponse.json({
        success: false,
        error: "Failed to send email",
        details: emailError instanceof Error ? emailError.message : String(emailError),
      })
    }
  } catch (error) {
    console.error("Error in test email endpoint:", error)
    return NextResponse.json(
      {
        error: "Fout bij het testen van de e-mail",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
