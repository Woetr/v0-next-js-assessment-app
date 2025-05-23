import { NextResponse } from "next/server"
import { sendAssessmentResults } from "@/lib/email"
import { mockSubmitAssessment } from "./mock"

export async function POST(request: Request) {
  console.log("Assessment submission received")

  try {
    const { name, email, answers, timeTaken, deviceFingerprint } = await request.json()

    console.log("Submission data:", {
      name,
      email,
      answersCount: Object.keys(answers || {}).length,
      hasTimeTaken: !!timeTaken,
      hasDeviceFingerprint: !!deviceFingerprint,
    })

    if (!name || !email || !answers) {
      console.error("Missing required fields:", { name: !!name, email: !!email, answers: !!answers })
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

    // Check if we're in a preview environment
    const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

    if (isPreview) {
      console.log("Preview environment detected, using mock submission")
      await mockSubmitAssessment(submission)

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: "Assessment succesvol verzonden (preview mode)",
      })
    }

    console.log("Attempting to send email...")
    // Probeer e-mail te versturen met timeout
    const emailPromise = sendAssessmentResults(submission)

    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timed out after 30 seconds")), 30000)
    })

    // Race the email sending against the timeout
    const emailResult = await Promise.race([emailPromise, timeoutPromise]).catch((error) => {
      console.error("Email sending failed with timeout or error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timedOut: true,
      }
    })

    // Log het resultaat voor debugging
    console.log("Email sending result:", emailResult)

    // In een echte applicatie zou je de resultaten ook in een database kunnen opslaan
    console.log("Assessment submitted:", {
      name: submission.name,
      email: submission.email,
      timestamp: submission.timestamp,
      answersCount: Object.keys(submission.answers).length,
      emailSuccess: emailResult.success,
    })

    // Als e-mail verzenden mislukt, log de fout maar ga toch door
    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error)

      // Stuur toch een succesvolle response om de gebruiker niet te blokkeren
      return NextResponse.json({
        success: true,
        emailSent: false,
        warning:
          "Assessment is ontvangen, maar er was een probleem met het verzenden van de e-mail. Het team is op de hoogte gebracht.",
        details: emailResult.error || "Onbekende fout",
      })
    }

    // Stuur een succesvolle response
    return NextResponse.json({
      success: true,
      emailSent: true,
      message: "Assessment succesvol verzonden",
      messageId: emailResult.messageId,
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
