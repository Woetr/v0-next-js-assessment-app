type EmailResult = {
  success: boolean
  messageId?: string
  error?: string
}

export async function sendEmailWithResend(
  to: string,
  subject: string,
  text: string,
  html?: string,
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
    const emailData = {
      from: "BouwerPower Assessment <onboarding@resend.dev>", // Gebruik Resend's gratis domein
      to: [to],
      subject,
      text,
      html: html || text,
    }

    console.log("Sending email with data:", {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      textLength: emailData.text.length,
      htmlLength: emailData.html.length,
    })

    // Send email via Resend API
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
  } catch (error) {
    console.error("Failed to send email via Resend:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
