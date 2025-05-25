type AssessmentData = {
  name: string
  email: string
  timestamp: string
  answers: Record<number, string>
  timeTaken?: Record<number, number>
  deviceFingerprint?: string
}

export async function generateAssessmentPDF(data: AssessmentData): Promise<Buffer> {
  // Import jsPDF dynamically to avoid SSR issues
  const { jsPDF } = await import("jspdf")

  // Import our analysis functions
  const { calculateDetailedProfile, generateInsights, questions } = await import("@/data/questions")

  const doc = new jsPDF()

  // Calculate profile and insights
  const profile = calculateDetailedProfile(data.answers, data.timeTaken || {})
  const insights = generateInsights(profile)
  const bias = await import("@/data/questions").then((m) =>
    m.detectSocialDesirabilityBias(data.answers, data.timeTaken || {}),
  )

  // PDF Styling
  const primaryColor = [45, 92, 136] // #2d5c88
  const lightGray = [245, 245, 245]
  const darkGray = [60, 60, 60]
  const greenColor = [76, 175, 80]
  const yellowColor = [255, 193, 7]
  const redColor = [244, 67, 54]

  let yPosition = 20

  // Header with BouwerPower branding
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 35, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(26)
  doc.setFont("helvetica", "bold")
  doc.text("BouwerPower", 20, 22)

  doc.setFontSize(16)
  doc.setFont("helvetica", "normal")
  doc.text("Assessment Rapport", 20, 30)

  yPosition = 50

  // Candidate Information Section
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 25, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Kandidaat Informatie", 20, yPosition)

  yPosition += 10
  doc.setTextColor(...darkGray)
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`Naam: ${data.name}`, 20, yPosition)
  yPosition += 6
  doc.text(`Email: ${data.email}`, 20, yPosition)
  yPosition += 6
  doc.text(
    `Assessment datum: ${new Date(data.timestamp).toLocaleDateString("nl-NL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    20,
    yPosition,
  )
  yPosition += 6
  doc.text(`Tijdstip: ${new Date(data.timestamp).toLocaleTimeString("nl-NL")}`, 20, yPosition)

  yPosition += 20

  // Executive Summary
  doc.setFillColor(...primaryColor)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Executive Summary", 20, yPosition)

  yPosition += 15
  doc.setTextColor(...darkGray)
  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")

  // Sales Fit Summary
  doc.setFont("helvetica", "bold")
  doc.text("Sales Geschiktheid:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(insights.salesFit, 60, yPosition)
  yPosition += 8

  doc.setFont("helvetica", "bold")
  doc.text("Werkstijl:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  doc.text(insights.workStyleMatch, 45, yPosition)
  yPosition += 8

  doc.setFont("helvetica", "bold")
  doc.text("Betrouwbaarheid:", 20, yPosition)
  doc.setFont("helvetica", "normal")
  const reliabilityText = bias.reliability > 0.8 ? "Hoog" : bias.reliability > 0.6 ? "Gemiddeld" : "Laag"
  doc.text(`${reliabilityText} (${Math.round(bias.reliability * 100)}%)`, 55, yPosition)

  yPosition += 20

  // Key Metrics Overview
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Kernmetrieken", 20, yPosition)

  yPosition += 15

  // Create a metrics grid
  const metrics = [
    { label: "Sales Aptitude", value: profile.sales.aptitude },
    { label: "Sales Ervaring", value: profile.sales.experience },
    { label: "Klantgerichtheid", value: profile.sales.customerFocus },
    { label: "Veerkracht", value: profile.sales.resilience },
    { label: "Communicatie", value: profile.sales.communication },
    { label: "Overtuigingskracht", value: profile.sales.persuasion },
  ]

  metrics.forEach((metric, index) => {
    const xPos = 20 + (index % 2) * 90
    const yPos = yPosition + Math.floor(index / 2) * 15

    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`${metric.label}:`, xPos, yPos)

    // Progress bar
    const barWidth = 50
    const barHeight = 4
    doc.setFillColor(...lightGray)
    doc.rect(xPos, yPos + 2, barWidth, barHeight, "F")

    const fillWidth = (metric.value / 100) * barWidth
    if (metric.value >= 70) doc.setFillColor(...greenColor)
    else if (metric.value >= 40) doc.setFillColor(...yellowColor)
    else doc.setFillColor(...redColor)

    doc.rect(xPos, yPos + 2, fillWidth, barHeight, "F")

    doc.setTextColor(...darkGray)
    doc.setFontSize(9)
    doc.text(`${metric.value}%`, xPos + barWidth + 5, yPos + 4)
  })

  yPosition += 50

  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  // Personality Profile (Big Five)
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Persoonlijkheidsprofiel (Big Five)", 20, yPosition)

  yPosition += 15
  doc.setTextColor(...darkGray)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  const personalityLabels = {
    extraversion: "Extraversie (Sociale energie & assertiviteit)",
    agreeableness: "Vriendelijkheid (Samenwerking & empathie)",
    conscientiousness: "Consciëntieusheid (Betrouwbaarheid & organisatie)",
    neuroticism: "Emotionele Stabiliteit (Omgekeerd neuroticisme)",
    openness: "Openheid (Creativiteit & nieuwsgierigheid)",
  }

  Object.entries(profile.personality).forEach(([trait, score]) => {
    const label = personalityLabels[trait as keyof typeof personalityLabels]
    // For neuroticism, we show emotional stability (inverted)
    const displayScore =
      trait === "neuroticism" ? Math.round(((3 - score + 3) / 6) * 100) : Math.round(((score + 3) / 6) * 100)

    doc.text(label, 20, yPosition)

    // Progress bar
    const barWidth = 80
    const barHeight = 5
    doc.setFillColor(...lightGray)
    doc.rect(120, yPosition - 2, barWidth, barHeight, "F")

    const fillWidth = (displayScore / 100) * barWidth
    if (displayScore >= 70) doc.setFillColor(...greenColor)
    else if (displayScore >= 40) doc.setFillColor(...yellowColor)
    else doc.setFillColor(...redColor)

    doc.rect(120, yPosition - 2, fillWidth, barHeight, "F")

    doc.setTextColor(...darkGray)
    doc.text(`${displayScore}%`, 205, yPosition + 1)

    yPosition += 12
  })

  yPosition += 10

  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  // Strengths and Development Areas
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Sterke Punten & Ontwikkelpunten", 20, yPosition)

  yPosition += 15

  // Strengths
  if (insights.strengths.length > 0) {
    doc.setTextColor(...greenColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("✓ Sterke Punten:", 20, yPosition)
    yPosition += 8

    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    insights.strengths.forEach((strength) => {
      const lines = doc.splitTextToSize(`• ${strength}`, 170)
      lines.forEach((line: string) => {
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
      yPosition += 2
    })
    yPosition += 5
  }

  // Development Areas
  if (insights.developmentAreas.length > 0) {
    doc.setTextColor(...yellowColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("⚠ Ontwikkelpunten:", 20, yPosition)
    yPosition += 8

    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    insights.developmentAreas.forEach((area) => {
      const lines = doc.splitTextToSize(`• ${area}`, 170)
      lines.forEach((line: string) => {
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
      yPosition += 2
    })
    yPosition += 5
  }

  // Risk Factors
  if (insights.riskFactors.length > 0) {
    doc.setTextColor(...redColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("⚠ Aandachtspunten:", 20, yPosition)
    yPosition += 8

    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    insights.riskFactors.forEach((risk) => {
      const lines = doc.splitTextToSize(`• ${risk}`, 170)
      lines.forEach((line: string) => {
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
      yPosition += 2
    })
  }

  // Check if we need a new page
  if (yPosition > 240) {
    doc.addPage()
    yPosition = 20
  }

  // Assessment Details
  yPosition += 10
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Assessment Details", 20, yPosition)

  yPosition += 15
  doc.setTextColor(...darkGray)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  doc.text(`Totaal aantal vragen beantwoord: ${profile.totalQuestions} van ${questions.length}`, 20, yPosition)
  yPosition += 6
  doc.text(`Gemiddelde responstijd: ${Math.round(profile.reliability.responseTime)} seconden per vraag`, 20, yPosition)
  yPosition += 6
  doc.text(`Volledigheid: ${profile.reliability.completeness}%`, 20, yPosition)
  yPosition += 6
  doc.text(`Betrouwbaarheidsscore: ${Math.round(bias.reliability * 100)}%`, 20, yPosition)

  if (bias.suspiciouslyFastAnswers > 0) {
    yPosition += 6
    doc.text(`Verdacht snelle antwoorden: ${bias.suspiciouslyFastAnswers}`, 20, yPosition)
  }

  if (bias.consistencyIssues > 0) {
    yPosition += 6
    doc.text(`Consistentie problemen: ${bias.consistencyIssues}`, 20, yPosition)
  }

  yPosition += 15

  // Category Breakdown
  doc.setFillColor(...lightGray)
  doc.rect(15, yPosition - 5, 180, 8, "F")

  doc.setTextColor(...primaryColor)
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Scores per Categorie", 20, yPosition)

  yPosition += 15
  doc.setTextColor(...darkGray)
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")

  const categoryLabels = {
    persoonlijkheid: "Persoonlijkheid",
    sales: "Sales Vaardigheden",
    ervaring: "Ervaring & Competenties",
    situationeel: "Situationeel Handelen",
    waarden: "Waarden & Motivatie",
    werkethiek: "Werkethiek",
    relaties: "Relatiebeheer",
  }

  Object.entries(profile.categoryScores).forEach(([category, score]) => {
    const label = categoryLabels[category as keyof typeof categoryLabels] || category

    doc.text(`${label}:`, 20, yPosition)

    // Progress bar
    const barWidth = 60
    const barHeight = 4
    doc.setFillColor(...lightGray)
    doc.rect(120, yPosition - 2, barWidth, barHeight, "F")

    const fillWidth = (score / 100) * barWidth
    if (score >= 70) doc.setFillColor(...greenColor)
    else if (score >= 40) doc.setFillColor(...yellowColor)
    else doc.setFillColor(...redColor)

    doc.rect(120, yPosition - 2, fillWidth, barHeight, "F")

    doc.setTextColor(...darkGray)
    doc.text(`${score}%`, 185, yPosition + 1)

    yPosition += 10
  })

  // Footer
  yPosition = 285
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.text("Dit rapport is gegenereerd door BouwerPower Assessment Tool", 20, yPosition)
  yPosition += 4
  doc.text(`Gegenereerd op: ${new Date().toLocaleString("nl-NL")}`, 20, yPosition)
  yPosition += 4
  doc.text("Vertrouwelijk document - alleen bestemd voor recruitment doeleinden", 20, yPosition)

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
  return pdfBuffer
}
