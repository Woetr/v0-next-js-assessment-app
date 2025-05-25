import { NextResponse } from "next/server"
import { sendEmailWithResend } from "@/lib/resend-email"

export async function GET(request: Request) {
  try {
    // Alleen toegankelijk in development of met een geheime sleutel
    const url = new URL(request.url)
    const secret = url.searchParams.get("secret")
    const isAuthorized = process.env.NODE_ENV === "development" || secret === process.env.EMAIL_TEST_SECRET

    if (!isAuthorized) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 })
    }

    // Log alle omgevingsvariabelen (zonder gevoelige informatie)
    console.log("Environment variables check:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
      usingResendDomain: "onboarding@resend.dev", // Toon dat we Resend's domein gebruiken
    })

    const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"

    // Stuur een test e-mail via Resend
    const result = await sendEmailWithResend(
      recipientEmail,
      "Test Email van BouwerPower Assessment (via Resend)",
      "Dit is een test e-mail om te controleren of de Resend e-mailconfiguratie correct werkt.",
      "<h1>Test Email via Resend</h1><p>Dit is een test e-mail om te controleren of de Resend e-mailconfiguratie correct werkt.</p><p><strong>Verzonden via:</strong> Resend API</p>",
    )

    console.log("Test email result:", result)

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? "Test e-mail succesvol verzonden via Resend"
        : "Fout bij het verzenden van de test e-mail",
      details: result,
      service: "Resend",
    })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json(
      {
        error: "Fout bij het verzenden van de test e-mail",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
