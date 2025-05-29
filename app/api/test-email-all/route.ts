import { NextResponse } from "next/server"
import { sendEmailWithResend } from "@/lib/resend-email"
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

    // Log alle omgevingsvariabelen (zonder gevoelige informatie)
    console.log("Environment variables check:", {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_ENV: process.env.VERCEL_ENV,
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      hasEmailServerHost: !!process.env.EMAIL_SERVER_HOST,
      hasEmailServerUser: !!process.env.EMAIL_SERVER_USER,
      hasRecipientEmail: !!process.env.RECIPIENT_EMAIL,
    })

    const recipientEmail = process.env.RECIPIENT_EMAIL || "wg.eijkelenkamp@gmail.com"
    const testTime = new Date().toISOString()

    // Test beide email methoden
    const results = {
      resend: null,
      nodemailer: null,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
        hasResendApiKey: !!process.env.RESEND_API_KEY,
        hasEmailServerHost: !!process.env.EMAIL_SERVER_HOST,
        hasEmailServerUser: !!process.env.EMAIL_SERVER_USER,
      },
    }

    // Test Resend
    try {
      console.log("Testing Resend email...")
      const resendResult = await sendEmailWithResend(
        recipientEmail,
        `Test Email via Resend (${testTime})`,
        "Dit is een test e-mail verzonden via Resend API.",
        `<h1>Test Email via Resend</h1>
        <p>Dit is een test e-mail verzonden via Resend API.</p>
        <p><strong>Tijdstip:</strong> ${testTime}</p>`,
      )
      results.resend = resendResult
    } catch (error) {
      results.resend = { success: false, error: String(error) }
    }

    // Test Nodemailer
    try {
      console.log("Testing Nodemailer email...")
      const nodemailerResult = await sendSimpleEmail(
        recipientEmail,
        `Test Email via Nodemailer (${testTime})`,
        "Dit is een test e-mail verzonden via Nodemailer.",
        `<h1>Test Email via Nodemailer</h1>
        <p>Dit is een test e-mail verzonden via Nodemailer.</p>
        <p><strong>Tijdstip:</strong> ${testTime}</p>`,
      )
      results.nodemailer = nodemailerResult
    } catch (error) {
      results.nodemailer = { success: false, error: String(error) }
    }

    return NextResponse.json({
      results,
      timestamp: testTime,
      recipient: recipientEmail,
    })
  } catch (error) {
    console.error("Error in test-email-all:", error)
    return NextResponse.json(
      {
        error: "Fout bij het testen van e-mail",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
