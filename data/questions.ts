export type Option = {
  id: string
  text: string
  personalityScore: {
    extraversion: number
    agreeableness: number
    conscientiousness: number
    neuroticism: number
    openness: number
  }
  salesScore: number
  socialDesirabilityScore: number
  reverseScored?: boolean // Voor omgekeerd scoren
}

export type Question = {
  id: number
  text: string
  options: Option[]
  category: "personality" | "sales" | "mixed"
  timeLimit?: number // Tijdslimiet in seconden
  consistencyGroup?: string // Voor consistentie checks
  isControlQuestion?: boolean // Voor validatie
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Wanneer ik nieuwe mensen ontmoet, doe ik meestal:",
    category: "personality",
    timeLimit: 30,
    consistencyGroup: "extraversion",
    options: [
      {
        id: "1a",
        text: "Actief deelnemen en gesprekken initiëren",
        personalityScore: { extraversion: 3, agreeableness: 1, conscientiousness: 0, neuroticism: -1, openness: 1 },
        salesScore: 3,
        socialDesirabilityScore: 2,
      },
      {
        id: "1b",
        text: "Wachten tot anderen eerst naar mij toekomen",
        personalityScore: { extraversion: -2, agreeableness: 0, conscientiousness: 0, neuroticism: 1, openness: -1 },
        salesScore: -2,
        socialDesirabilityScore: 0,
      },
      {
        id: "1c",
        text: "De groepsdynamiek observeren voordat ik deelneem",
        personalityScore: { extraversion: 0, agreeableness: 1, conscientiousness: 2, neuroticism: 0, openness: 1 },
        salesScore: 1,
        socialDesirabilityScore: 1,
      },
      {
        id: "1d",
        text: "Liever grote sociale bijeenkomsten helemaal vermijden",
        personalityScore: { extraversion: -3, agreeableness: -1, conscientiousness: 0, neuroticism: 2, openness: -1 },
        salesScore: -3,
        socialDesirabilityScore: -1,
      },
    ],
  },
  {
    id: 2,
    text: "Wanneer een klant bezwaar maakt tegen mijn voorstel, doe ik meestal:",
    category: "sales",
    timeLimit: 35,
    options: [
      {
        id: "2a",
        text: "Zorgvuldig luisteren en hun zorgen direct aanpakken",
        personalityScore: { extraversion: 1, agreeableness: 2, conscientiousness: 2, neuroticism: -1, openness: 1 },
        salesScore: 3,
        socialDesirabilityScore: 3,
      },
      {
        id: "2b",
        text: "Proberen het onderwerp te veranderen naar positievere aspecten",
        personalityScore: { extraversion: 1, agreeableness: 0, conscientiousness: -1, neuroticism: 1, openness: -1 },
        salesScore: -1,
        socialDesirabilityScore: 0,
      },
      {
        id: "2c",
        text: "Onmiddellijk een korting of incentive aanbieden",
        personalityScore: { extraversion: 0, agreeableness: 2, conscientiousness: -1, neuroticism: 1, openness: 0 },
        salesScore: 0,
        socialDesirabilityScore: 1,
      },
      {
        id: "2d",
        text: "Vasthouden aan mijn oorspronkelijke voorstel",
        personalityScore: { extraversion: 1, agreeableness: -2, conscientiousness: 1, neuroticism: 0, openness: -1 },
        salesScore: 1,
        socialDesirabilityScore: -1,
      },
    ],
  },
  // Controle vraag voor consistentie
  {
    id: 3,
    text: "In sociale situaties voel ik me meestal:",
    category: "personality",
    timeLimit: 25,
    consistencyGroup: "extraversion",
    isControlQuestion: true,
    options: [
      {
        id: "3a",
        text: "Energiek en op mijn gemak",
        personalityScore: { extraversion: 3, agreeableness: 0, conscientiousness: 0, neuroticism: -2, openness: 1 },
        salesScore: 2,
        socialDesirabilityScore: 2,
      },
      {
        id: "3b",
        text: "Voorzichtig en observerend",
        personalityScore: { extraversion: -1, agreeableness: 1, conscientiousness: 1, neuroticism: 1, openness: 0 },
        salesScore: 0,
        socialDesirabilityScore: 1,
      },
      {
        id: "3c",
        text: "Ongemakkelijk en gespannen",
        personalityScore: { extraversion: -2, agreeableness: 0, conscientiousness: 0, neuroticism: 3, openness: -1 },
        salesScore: -2,
        socialDesirabilityScore: -2,
      },
      {
        id: "3d",
        text: "Neutraal, het hangt van de situatie af",
        personalityScore: { extraversion: 0, agreeableness: 1, conscientiousness: 1, neuroticism: 0, openness: 0 },
        salesScore: 0,
        socialDesirabilityScore: 0,
      },
    ],
  },
  // Omgekeerd gescoorde vraag
  {
    id: 4,
    text: "Ik vind het moeilijk om nee te zeggen tegen verzoeken van anderen:",
    category: "personality",
    timeLimit: 30,
    options: [
      {
        id: "4a",
        text: "Helemaal mee eens",
        personalityScore: { extraversion: 0, agreeableness: 3, conscientiousness: -1, neuroticism: 2, openness: 0 },
        salesScore: -1,
        socialDesirabilityScore: 1,
        reverseScored: true,
      },
      {
        id: "4b",
        text: "Enigszins mee eens",
        personalityScore: { extraversion: 0, agreeableness: 1, conscientiousness: 0, neuroticism: 1, openness: 0 },
        salesScore: 0,
        socialDesirabilityScore: 1,
        reverseScored: true,
      },
      {
        id: "4c",
        text: "Enigszins mee oneens",
        personalityScore: { extraversion: 1, agreeableness: -1, conscientiousness: 1, neuroticism: -1, openness: 0 },
        salesScore: 1,
        socialDesirabilityScore: 0,
      },
      {
        id: "4d",
        text: "Helemaal mee oneens",
        personalityScore: { extraversion: 2, agreeableness: -2, conscientiousness: 2, neuroticism: -2, openness: 0 },
        salesScore: 2,
        socialDesirabilityScore: -1,
      },
    ],
  },
  // Voeg meer vragen toe...
  {
    id: 5,
    text: "Wanneer ik onder druk sta, heb ik de neiging om:",
    category: "mixed",
    timeLimit: 35,
    consistencyGroup: "stress_response",
    options: [
      {
        id: "5a",
        text: "Kalm te blijven en systematisch te werk te gaan",
        personalityScore: { extraversion: 0, agreeableness: 0, conscientiousness: 3, neuroticism: -3, openness: 0 },
        salesScore: 3,
        socialDesirabilityScore: 3,
      },
      {
        id: "5b",
        text: "Snel beslissingen te nemen, ook als ze niet perfect zijn",
        personalityScore: { extraversion: 2, agreeableness: 0, conscientiousness: -1, neuroticism: 0, openness: 1 },
        salesScore: 1,
        socialDesirabilityScore: 1,
      },
      {
        id: "5c",
        text: "Hulp te zoeken bij anderen",
        personalityScore: { extraversion: 1, agreeableness: 2, conscientiousness: 0, neuroticism: 1, openness: 0 },
        salesScore: 0,
        socialDesirabilityScore: 2,
      },
      {
        id: "5d",
        text: "Overweldigd te raken en moeite te hebben met focussen",
        personalityScore: { extraversion: -1, agreeableness: 0, conscientiousness: -2, neuroticism: 3, openness: 0 },
        salesScore: -3,
        socialDesirabilityScore: -2,
      },
    ],
  },
]

// Functie om vragen te randomiseren
export const getRandomizedQuestions = () => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled
}

// Verbeterde sociale wenselijkheid detectie
export const detectSocialDesirabilityBias = (answers: Record<number, string>, timeTaken: Record<number, number>) => {
  let totalSocialDesirabilityScore = 0
  let count = 0
  let suspiciouslyFastAnswers = 0
  let consistencyIssues = 0

  // Controleer antwoordtijden
  Object.entries(timeTaken).forEach(([questionId, time]) => {
    const question = questions.find((q) => q.id === Number.parseInt(questionId))
    if (question && question.timeLimit && time < question.timeLimit * 0.3) {
      suspiciouslyFastAnswers++
    }
  })

  // Controleer sociale wenselijkheid
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find((q) => q.id === Number.parseInt(questionId))
    if (question) {
      const option = question.options.find((o) => o.id === optionId)
      if (option) {
        totalSocialDesirabilityScore += option.socialDesirabilityScore
        count++
      }
    }
  })

  // Controleer consistentie tussen gerelateerde vragen
  const consistencyGroups: Record<string, number[]> = {}
  questions.forEach((q) => {
    if (q.consistencyGroup) {
      if (!consistencyGroups[q.consistencyGroup]) {
        consistencyGroups[q.consistencyGroup] = []
      }
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find((o) => o.id === answer)
        if (option) {
          // Voor extraversion groep, kijk naar extraversion scores
          if (q.consistencyGroup === "extraversion") {
            consistencyGroups[q.consistencyGroup].push(option.personalityScore.extraversion)
          }
        }
      }
    }
  })

  // Bereken consistentie
  Object.values(consistencyGroups).forEach((scores) => {
    if (scores.length >= 2) {
      const variance =
        scores.reduce((acc, score, _, arr) => {
          const mean = arr.reduce((sum, s) => sum + s, 0) / arr.length
          return acc + Math.pow(score - mean, 2)
        }, 0) / scores.length

      if (variance > 4) {
        // Hoge variantie duidt op inconsistentie
        consistencyIssues++
      }
    }
  })

  const averageScore = count > 0 ? totalSocialDesirabilityScore / count : 0

  return {
    biased: averageScore > 2 || suspiciouslyFastAnswers > 3 || consistencyIssues > 1,
    score: averageScore,
    suspiciouslyFastAnswers,
    consistencyIssues,
    reliability: Math.max(0, 1 - suspiciouslyFastAnswers * 0.1 - consistencyIssues * 0.2),
  }
}

// Functie om consistentie te controleren
export const checkConsistency = (answers: Record<number, string>) => {
  const consistencyGroups: Record<string, { questionId: number; score: number }[]> = {}

  questions.forEach((question) => {
    if (question.consistencyGroup && answers[question.id]) {
      const option = question.options.find((o) => o.id === answers[question.id])
      if (option) {
        if (!consistencyGroups[question.consistencyGroup]) {
          consistencyGroups[question.consistencyGroup] = []
        }

        let score = 0
        if (question.consistencyGroup === "extraversion") {
          score = option.personalityScore.extraversion
        }
        // Voeg meer consistentie groepen toe indien nodig

        consistencyGroups[question.consistencyGroup].push({
          questionId: question.id,
          score: score,
        })
      }
    }
  })

  return consistencyGroups
}

export const calculatePersonalityProfile = (answers: Record<number, string>) => {
  const profile = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0,
    total: 0,
  }

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find((q) => q.id === Number.parseInt(questionId))
    if (question) {
      const option = question.options.find((o) => o.id === optionId)
      if (option) {
        // Pas reverse scoring toe indien nodig
        const multiplier = option.reverseScored ? -1 : 1

        profile.extraversion += option.personalityScore.extraversion * multiplier
        profile.agreeableness += option.personalityScore.agreeableness * multiplier
        profile.conscientiousness += option.personalityScore.conscientiousness * multiplier
        profile.neuroticism += option.personalityScore.neuroticism * multiplier
        profile.openness += option.personalityScore.openness * multiplier
        profile.total++
      }
    }
  })

  // Normaliseer scores
  if (profile.total > 0) {
    profile.extraversion = Math.round((profile.extraversion / profile.total) * 100) / 100
    profile.agreeableness = Math.round((profile.agreeableness / profile.total) * 100) / 100
    profile.conscientiousness = Math.round((profile.conscientiousness / profile.total) * 100) / 100
    profile.neuroticism = Math.round((profile.neuroticism / profile.total) * 100) / 100
    profile.openness = Math.round((profile.openness / profile.total) * 100) / 100
  }

  return profile
}

export const calculateSalesScore = (answers: Record<number, string>) => {
  let totalSalesScore = 0
  let count = 0

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find((q) => q.id === Number.parseInt(questionId))
    if (question) {
      const option = question.options.find((o) => o.id === optionId)
      if (option) {
        const multiplier = option.reverseScored ? -1 : 1
        totalSalesScore += option.salesScore * multiplier
        count++
      }
    }
  })

  const averageScore = count > 0 ? totalSalesScore / count : 0
  const normalizedScore = Math.round(((averageScore + 3) / 6) * 100)

  return {
    raw: averageScore,
    normalized: Math.max(0, Math.min(100, normalizedScore)),
  }
}

export const getQuestions = () => {
  return getRandomizedQuestions()
}
