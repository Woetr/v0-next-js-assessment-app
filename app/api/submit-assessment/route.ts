import { NextResponse } from "next/server"
import { sendAssessmentResults } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { name, email, answers, timeTaken, deviceFingerprint } = await request.json()

    if (!name || !email || !answers) {
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

    // Probeer e-mail te versturen
    const emailResult = await sendAssessmentResults(submission)

    // Log het resultaat voor debugging
    console.log("Email sending result:", emailResult)

    // In een echte applicatie zou je de resultaten ook in een database kunnen opslaan
    console.log("Assessment submitted:", {
      name: submission.name,
      email: submission.email,
      timestamp: submission.timestamp,
      answersCount: Object.keys(submission.answers).length,
    })

    // Als e-mail verzenden mislukt in productie, geef een fout terug
    if (!emailResult.success && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          error: "Fout bij het verzenden van de e-mail",
          details: emailResult.error || emailResult.message,
        },
        { status: 500 },
      )
    }

    // Stuur een succesvolle response
    return NextResponse.json({
      success: true,
      emailSent: emailResult.success,
      message: emailResult.note || "Assessment succesvol verzonden",
    })
  } catch (error) {
    console.error("Error processing assessment submission:", error)
    return NextResponse.json(
      {
        error: "Fout bij verwerken van assessment",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
