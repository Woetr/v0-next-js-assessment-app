import { NextResponse } from "next/server"
import { sendAssessmentResults } from "@/lib/email"

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

    // Probeer e-mail te versturen
    const emailResult = await sendAssessmentResults(testSubmission)

    // Log het resultaat voor debugging
    console.log("Test email sending result:", emailResult)

    // Stuur een response met het resultaat
    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success ? "Test e-mail succesvol verzonden" : "Fout bij het verzenden van de test e-mail",
      details: emailResult,
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
