import type { Transporter } from "nodemailer"

type EmailConfig = {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

type EmailResult = {
  success: boolean
  messageId?: string
  error?: string
}

let cachedTransporter: Transporter | null = null

export async function sendSimpleEmail(to: string, subject: string, text: string, html?: string): Promise<EmailResult> {
  console.log(`Attempting to send email to ${to} with subject "${subject}"`)

  try {
    // Dynamically import nodemailer
    const nodemailer = await import("nodemailer")

    // Check for required environment variables
    const host = process.env.EMAIL_SERVER_HOST
    const port = process.env.EMAIL_SERVER_PORT ? Number.parseInt(process.env.EMAIL_SERVER_PORT) : 587
    const user = process.env.EMAIL_SERVER_USER
    const pass = process.env.EMAIL_SERVER_PASSWORD

    if (!host || !user || !pass) {
      console.error("Missing email configuration:", { host: !!host, user: !!user, pass: !!pass })
      return {
        success: false,
        error: "Missing email configuration",
      }
    }

    // Create email config
    const config: EmailConfig = {
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    }

    console.log("Email configuration:", {
      host,
      port,
      secure: config.secure,
      user: user.substring(0, 3) + "***", // Log partial user for debugging
    })

    // Create or reuse transporter
    let transporter = cachedTransporter
    if (!transporter) {
      console.log("Creating new transporter")
      transporter = nodemailer.createTransport({
        ...config,
        tls: {
          rejectUnauthorized: false,
        },
      })
      cachedTransporter = transporter
    }

    // Send email with minimal options
    console.log("Sending email...")
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || user,
      to,
      subject,
      text,
      html: html || text,
    })

    console.log("Email sent successfully:", info.messageId)
    return {
      success: true,
      messageId: info.messageId,
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
