import { NextResponse } from "next/server"
import { sendSimpleEmail } from "@/lib/simple-email"

export async function GET(request: Request) {
  try {
    // Alleen toegankelijk in development of met een geheime sleutel
    const url = new URL(request.url)
    const secret = url.searchParams.get("secret")
    const isAuthorized = process.env.NODE_ENV === "development" || secret === process.env.EMAIL_TEST_SECRET

    if (!isAuthorized) {
      return NextResponse.json({ error: "Niet geautoriseerd" }, { status: 401 })
    }

    const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"

    // Stuur een zeer eenvoudige test e-mail
    const result = await sendSimpleEmail(
      recipientEmail,
      "Test Email van BouwerPower Assessment",
      "Dit is een test e-mail om te controleren of de e-mailconfiguratie correct werkt.",
      "<h1>Test Email</h1><p>Dit is een test e-mail om te controleren of de e-mailconfiguratie correct werkt.</p>",
    )

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Test e-mail succesvol verzonden" : "Fout bij het verzenden van de test e-mail",
      details: result,
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
