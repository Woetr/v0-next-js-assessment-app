import type { EmailResult } from "./simple-email"

export async function sendEmailWithResend(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType: string
  }>,
): Promise<EmailResult> {
  console.log(`Sending email via Resend to ${to} with subject "${subject}"`)

  try {
    // Check for Resend API key
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is missing")
      return {
        success: false,
        error: "Resend API key is missing",
      }
    }

    // Prepare the email data
    const emailData: any = {
      from: "BouwerPower Assessment <onboarding@resend.dev>", // Gebruik Resend's gratis domein
      to: [to],
      subject,
      text,
      html: html || text,
    }

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments.map((attachment) => ({
        filename: attachment.filename,
        content: Array.from(attachment.content), // Convert Buffer to array for JSON
        type: attachment.contentType,
      }))
      console.log(`Adding ${attachments.length} attachment(s) to email`)
    }

    console.log("Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      textLength: emailData.text.length,
      htmlLength: emailData.html?.length || 0,
      attachmentCount: emailData.attachments?.length || 0,
    })

    // Send email via Resend API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout for attachments

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(emailData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseData = await response.json()

      console.log("Resend API response:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      })

      if (response.ok) {
        console.log("Email sent successfully via Resend:", responseData.id)
        return {
          success: true,
          messageId: responseData.id,
        }
      } else {
        console.error("Resend API error:", responseData)
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}: ${response.statusText}`,
        }
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Fetch error when sending email via Resend:", fetchError)

      if (fetchError.name === "AbortError") {
        return {
          success: false,
          error: "Email sending timed out after 30 seconds",
        }
      }

      throw fetchError // Re-throw for outer catch
    }
  } catch (error) {
    console.error("Failed to send email via Resend:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
