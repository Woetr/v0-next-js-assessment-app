import type { AssessmentData } from "@/types"

export async function generateAssessmentPDF(data: AssessmentData): Promise<Buffer> {
  try {
    // Import jsPDF dynamically to avoid SSR issues
    const { jsPDF } = await import("jspdf")

    // Import our analysis functions
    const {
      calculateComprehensiveScores,
      determineAdvancedProfile,
      allQuestions,
      detectSocialDesirabilityBias,
      calculateEnhancedScores,
    } = await import("@/data/questions")

    const doc = new jsPDF()

    // Calculate comprehensive profile and insights
    const enhancedScores = calculateEnhancedScores(data.answers, data.timeTaken || {})
    const comprehensiveScores = enhancedScores.traditional
    const profileResult = determineAdvancedProfile(comprehensiveScores)
    const bias = detectSocialDesirabilityBias(data.answers, data.timeTaken || {})

    // PDF Styling
    const primaryColor = [45, 92, 136] // #2d5c88
    const lightGray = [248, 249, 250]
    const mediumGray = [108, 117, 125]
    const darkGray = [33, 37, 41]
    const greenColor = [40, 167, 69]
    const yellowColor = [255, 193, 7]
    const redColor = [220, 53, 69]
    const blueColor = [0, 123, 255]
    const orangeColor = [253, 126, 20]
    const purpleColor = [102, 16, 242]

    let yPosition = 20

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > 270) {
        doc.addPage()
        yPosition = 20
        return true
      }
      return false
    }

    // Helper function to draw progress bar
    const drawProgressBar = (
      x: number,
      y: number,
      width: number,
      height: number,
      percentage: number,
      color: number[],
    ) => {
      // Background
      doc.setFillColor(230, 230, 230)
      doc.rect(x, y, width, height, "F")

      // Fill
      const fillWidth = (percentage / 100) * width
      doc.setFillColor(...color)
      doc.rect(x, y, fillWidth, height, "F")

      // Border
      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.5)
      doc.rect(x, y, width, height)
    }

    // Helper function to normalize scores using the new formula
    const normalizeScore = (rawScore: number, minScore = 0, maxScore = 100): number => {
      if (maxScore === minScore) return 50 // Avoid division by zero
      const normalized = ((rawScore - minScore) / (maxScore - minScore)) * 100
      return Math.max(0, Math.min(100, Math.round(normalized)))
    }

    // Helper function to get score color
    const getScoreColor = (score: number): number[] => {
      if (score >= 80) return greenColor
      if (score >= 60) return blueColor
      if (score >= 40) return yellowColor
      return redColor
    }

    // Helper function to render score section
    const renderScoreSection = (
      title: string,
      scores: Record<string, number>,
      descriptions: Record<string, string>,
      sectionColor: number[],
      minScores: Record<string, number> = {},
      maxScores: Record<string, number> = {},
    ) => {
      checkPageBreak(80)

      // Section header
      doc.setFillColor(...sectionColor)
      doc.rect(15, yPosition - 5, 180, 10, "F")

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(title, 20, yPosition + 2)

      yPosition += 18

      // Render each score
      Object.entries(scores).forEach(([key, rawScore], index) => {
        checkPageBreak(20)

        // Get min/max for this trait, default to 0-100
        const minScore = minScores[key] || 0
        const maxScore = maxScores[key] || 100

        // Normalize the score using the new formula
        const normalizedScore = normalizeScore(rawScore, minScore, maxScore)

        // Alternating background for better readability
        if (index % 2 === 0) {
          doc.setFillColor(...lightGray)
          doc.rect(15, yPosition - 3, 180, 16, "F")
        }

        doc.setTextColor(...darkGray)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(descriptions[key] || key, 20, yPosition + 2)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.setTextColor(...mediumGray)
        doc.text(`Raw: ${rawScore} | Range: ${minScore}-${maxScore}`, 20, yPosition + 8)

        // Progress bar with score-based color
        const barColor = getScoreColor(normalizedScore)
        drawProgressBar(120, yPosition - 1, 60, 8, normalizedScore, barColor)

        // Score text
        doc.setTextColor(...darkGray)
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.text(`${normalizedScore}%`, 185, yPosition + 4)

        yPosition += 18
      })

      yPosition += 10
    }

    // Header with BouwerPower branding
    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("BouwerPower", 20, 25)

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.text("Uitgebreid Sales Assessment Rapport", 20, 35)

    yPosition = 55

    // Candidate Information Section
    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 8, 180, 30, "F")

    doc.setTextColor(...primaryColor)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Kandidaat Informatie", 20, yPosition)

    yPosition += 12
    doc.setTextColor(...darkGray)
    doc.setFontSize(11)
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

    // Overall Score in a prominent box
    doc.setFillColor(...primaryColor)
    doc.rect(140, yPosition - 18, 50, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Totaalscore", 145, yPosition - 10)
    doc.setFontSize(16)
    doc.text(`${enhancedScores.combined}/100`, 150, yPosition - 2)

    yPosition += 25

    // Executive Summary
    checkPageBreak(60)
    doc.setFillColor(...primaryColor)
    doc.rect(15, yPosition - 5, 180, 12, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("SAMENVATTING", 20, yPosition + 3)

    yPosition += 20

    // Profile name and confidence in a styled box
    doc.setFillColor(240, 248, 255)
    doc.rect(15, yPosition - 5, 180, 25, "F")
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.rect(15, yPosition - 5, 180, 25)

    doc.setTextColor(...primaryColor)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(`${profileResult.profile.name}`, 20, yPosition + 5)

    doc.setTextColor(...mediumGray)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Betrouwbaarheid: ${profileResult.confidence}%`, 20, yPosition + 12)

    yPosition += 30

    // Profile description
    doc.setTextColor(...darkGray)
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    const descriptionLines = doc.splitTextToSize(profileResult.profile.description, 170)
    descriptionLines.forEach((line: string) => {
      doc.text(line, 20, yPosition)
      yPosition += 5
    })

    yPosition += 10

    // Key Insights
    doc.setTextColor(...blueColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Belangrijkste Inzichten:", 20, yPosition)
    yPosition += 8

    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    profileResult.insights.forEach((insight) => {
      const lines = doc.splitTextToSize(`• ${insight}`, 170)
      lines.forEach((line: string) => {
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
    })

    yPosition += 15

    // Define score ranges for normalization (these would be based on your research/benchmarks)
    const salesDNAMinMax = {
      willToSell: { min: 10, max: 90 },
      needForApproval: { min: 10, max: 90 }, // Note: this is reverse scored
      nonSupportiveBuyingCycle: { min: 10, max: 90 },
    }

    const competencyMinMax = {
      hunting: { min: 10, max: 90 },
      consultativeSelling: { min: 10, max: 90 },
      qualifying: { min: 10, max: 90 },
      closingSkills: { min: 10, max: 90 },
      accountManagement: { min: 10, max: 90 },
      presentationSkills: { min: 10, max: 90 },
    }

    const attributeMinMax = {
      desire: { min: 10, max: 90 },
      commitment: { min: 10, max: 90 },
      responsibility: { min: 10, max: 90 },
      outlook: { min: 10, max: 90 },
      motivation: { min: 10, max: 90 },
      selfEsteem: { min: 10, max: 90 },
    }

    const behavioralMinMax = {
      resilience: { min: 10, max: 90 },
      adaptability: { min: 10, max: 90 },
      empathy: { min: 10, max: 90 },
      assertiveness: { min: 10, max: 90 },
      persistence: { min: 10, max: 90 },
      communication: { min: 10, max: 90 },
    }

    const motivationalMinMax = {
      achievement: { min: 10, max: 90 },
      recognition: { min: 10, max: 90 },
      autonomy: { min: 10, max: 90 },
      growth: { min: 10, max: 90 },
      security: { min: 10, max: 90 },
      relationships: { min: 10, max: 90 },
    }

    // Sales DNA Section
    renderScoreSection(
      "VERKOOP DNA ANALYSE",
      {
        willToSell: comprehensiveScores.salesDNA.willToSell,
        needForApproval: 100 - comprehensiveScores.salesDNA.needForApproval, // Reverse score
        nonSupportiveBuyingCycle: comprehensiveScores.salesDNA.nonSupportiveBuyingCycle,
      },
      {
        willToSell: "Verkoopbereidheid",
        needForApproval: "Onafhankelijkheid (omgekeerd van goedkeuringsbehoefte)",
        nonSupportiveBuyingCycle: "Omgaan met moeilijke koopprocessen",
      },
      orangeColor,
      {
        willToSell: salesDNAMinMax.willToSell.min,
        needForApproval: salesDNAMinMax.needForApproval.min,
        nonSupportiveBuyingCycle: salesDNAMinMax.nonSupportiveBuyingCycle.min,
      },
      {
        willToSell: salesDNAMinMax.willToSell.max,
        needForApproval: salesDNAMinMax.needForApproval.max,
        nonSupportiveBuyingCycle: salesDNAMinMax.nonSupportiveBuyingCycle.max,
      },
    )

    // Sales Competencies Section
    renderScoreSection(
      "VERKOOP COMPETENTIES",
      comprehensiveScores.competencies,
      {
        hunting: "Nieuwe klanten vinden",
        consultativeSelling: "Consultative verkoop",
        qualifying: "Kwalificeren van prospects",
        closingSkills: "Afsluitvaardigheden",
        accountManagement: "Accountbeheer",
        presentationSkills: "Presentatievaardigheden",
      },
      blueColor,
      Object.fromEntries(Object.keys(competencyMinMax).map((k) => [k, competencyMinMax[k].min])),
      Object.fromEntries(Object.keys(competencyMinMax).map((k) => [k, competencyMinMax[k].max])),
    )

    // Sales Attributes Section
    renderScoreSection(
      "VERKOOP EIGENSCHAPPEN",
      comprehensiveScores.attributes,
      {
        desire: "Verlangen naar succes",
        commitment: "Toewijding",
        responsibility: "Verantwoordelijkheid",
        outlook: "Positieve instelling",
        motivation: "Motivatie",
        selfEsteem: "Zelfvertrouwen",
      },
      greenColor,
      Object.fromEntries(Object.keys(attributeMinMax).map((k) => [k, attributeMinMax[k].min])),
      Object.fromEntries(Object.keys(attributeMinMax).map((k) => [k, attributeMinMax[k].max])),
    )

    // Behavioral Traits Section
    renderScoreSection(
      "GEDRAGSKENMERKEN",
      comprehensiveScores.behavioral,
      {
        resilience: "Veerkracht",
        adaptability: "Aanpassingsvermogen",
        empathy: "Empathie",
        assertiveness: "Assertiviteit",
        persistence: "Volharding",
        communication: "Communicatievaardigheden",
      },
      purpleColor,
      Object.fromEntries(Object.keys(behavioralMinMax).map((k) => [k, behavioralMinMax[k].min])),
      Object.fromEntries(Object.keys(behavioralMinMax).map((k) => [k, behavioralMinMax[k].max])),
    )

    // Motivational Drivers Section
    renderScoreSection(
      "MOTIVATIE DRIVERS",
      comprehensiveScores.motivational,
      {
        achievement: "Prestatiegerichtheid",
        recognition: "Erkenning",
        autonomy: "Autonomie",
        growth: "Groei en ontwikkeling",
        security: "Zekerheid",
        relationships: "Relaties",
      },
      [255, 87, 34], // Deep orange
      Object.fromEntries(Object.keys(motivationalMinMax).map((k) => [k, motivationalMinMax[k].min])),
      Object.fromEntries(Object.keys(motivationalMinMax).map((k) => [k, motivationalMinMax[k].max])),
    )

    // SJT Scores Section (if available)
    if (
      enhancedScores.sjt &&
      Object.keys(data.answers).some((id) => Number.parseInt(id) >= 46 && Number.parseInt(id) <= 55)
    ) {
      renderScoreSection(
        "SITUATIONEEL BEOORDELINGSVERMOGEN",
        enhancedScores.sjt,
        {
          decisionMaking: "Besluitvorming",
          stressManagement: "Stressmanagement",
          customerFocus: "Klantgerichtheid",
          problemSolving: "Probleemoplossing",
          leadership: "Leiderschap",
          teamwork: "Teamwork",
        },
        [156, 39, 176], // Purple
      )
    }

    // Cognitive Scores Section (if available)
    if (
      enhancedScores.cognitive &&
      Object.keys(data.answers).some((id) => Number.parseInt(id) >= 56 && Number.parseInt(id) <= 65)
    ) {
      renderScoreSection(
        "COGNITIEVE VAARDIGHEDEN",
        {
          numerical: enhancedScores.cognitive.numerical,
          verbal: enhancedScores.cognitive.verbal,
          logical: enhancedScores.cognitive.logical,
          processingSpeed: enhancedScores.cognitive.processingSpeed,
          accuracy: enhancedScores.cognitive.accuracy,
        },
        {
          numerical: "Numerieke vaardigheden",
          verbal: "Verbale vaardigheden",
          logical: "Logisch denken",
          processingSpeed: "Verwerkingssnelheid",
          accuracy: "Nauwkeurigheid",
        },
        [63, 81, 181], // Indigo
      )
    }

    // Recruitment Recommendation Section
    checkPageBreak(80)
    doc.setFillColor(...primaryColor)
    doc.rect(15, yPosition - 5, 180, 12, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("RECRUITMENT AANBEVELING", 20, yPosition + 3)

    yPosition += 20

    // Recommendation box
    const recommendationColor = profileResult.profile.recruitmentAdvice.includes("STERK AANBEVOLEN")
      ? greenColor
      : profileResult.profile.recruitmentAdvice.includes("AANBEVOLEN")
        ? blueColor
        : profileResult.profile.recruitmentAdvice.includes("VOORWAARDELIJK")
          ? yellowColor
          : redColor

    doc.setFillColor(...recommendationColor)
    doc.rect(15, yPosition - 5, 180, 15, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text(profileResult.profile.recruitmentAdvice, 20, yPosition + 3)

    yPosition += 25

    // Ideal Role
    doc.setTextColor(...darkGray)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Ideale Rol:", 20, yPosition)
    yPosition += 8

    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.text(profileResult.profile.idealRole, 20, yPosition)
    yPosition += 15

    // Strengths
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Sterke Punten:", 20, yPosition)
    yPosition += 8

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    profileResult.profile.strengths.forEach((strength) => {
      const lines = doc.splitTextToSize(`• ${strength}`, 170)
      lines.forEach((line: string) => {
        checkPageBreak(6)
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
    })

    yPosition += 10

    // Development Areas
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Ontwikkelpunten:", 20, yPosition)
    yPosition += 8

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    profileResult.profile.developmentAreas.forEach((area) => {
      const lines = doc.splitTextToSize(`• ${area}`, 170)
      lines.forEach((line: string) => {
        checkPageBreak(6)
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
    })

    yPosition += 15

    // Management Tips
    checkPageBreak(50)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("Management Tips:", 20, yPosition)
    yPosition += 8

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    profileResult.profile.managementTips.forEach((tip) => {
      const lines = doc.splitTextToSize(`• ${tip}`, 170)
      lines.forEach((line: string) => {
        checkPageBreak(6)
        doc.text(line, 25, yPosition)
        yPosition += 5
      })
    })

    // Assessment Quality & Reliability
    yPosition += 15
    checkPageBreak(50)
    doc.setFillColor(...lightGray)
    doc.rect(15, yPosition - 5, 180, 45, "F")
    doc.setDrawColor(...mediumGray)
    doc.setLineWidth(1)
    doc.rect(15, yPosition - 5, 180, 45)

    doc.setTextColor(...primaryColor)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Assessment Kwaliteit & Betrouwbaarheid", 20, yPosition + 5)

    yPosition += 15
    doc.setTextColor(...darkGray)
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    doc.text(
      `Totaal aantal vragen beantwoord: ${Object.keys(data.answers).length} van ${allQuestions.length}`,
      20,
      yPosition,
    )
    yPosition += 6

    const avgResponseTime =
      Object.values(data.timeTaken || {}).reduce((sum, time) => sum + time, 0) /
        Object.values(data.timeTaken || {}).length || 0
    doc.text(`Gemiddelde responstijd: ${Math.round(avgResponseTime)} seconden per vraag`, 20, yPosition)
    yPosition += 6

    const completeness = Math.round((Object.keys(data.answers).length / allQuestions.length) * 100)
    doc.text(`Volledigheid: ${completeness}%`, 20, yPosition)
    yPosition += 6

    doc.text(`Betrouwbaarheidsscore: ${Math.round(bias.reliability * 100)}%`, 20, yPosition)

    if (bias.suspiciouslyFastAnswers > 5) {
      yPosition += 8
      doc.setTextColor(...redColor)
      doc.setFont("helvetica", "bold")
    }

    if (bias.socialDesirabilityFlags > 3) {
      yPosition += 6
      doc.setTextColor(...orangeColor)
      doc.setFont("helvetica", "bold")
      doc.text(`⚠ Sociale wenselijkheid indicatoren: ${bias.socialDesirabilityFlags}`, 20, yPosition)
    }

    // Footer
    yPosition = 285
    doc.setFontSize(8)
    doc.setTextColor(...mediumGray)
    doc.setFont("helvetica", "normal")
    doc.text("Dit rapport is gegenereerd door BouwerPower Uitgebreid Sales Assessment", 20, yPosition)
    yPosition += 4
    doc.text(`Gegenereerd op: ${new Date().toLocaleString("nl-NL")}`, 20, yPosition)
    yPosition += 4
    doc.text("Vertrouwelijk document - alleen bestemd voor recruitment doeleinden", 20, yPosition)

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"))
    return pdfBuffer
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}
