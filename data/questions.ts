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
  experienceScore: number
  socialDesirabilityScore: number
  reverseScored?: boolean
}

export type Question = {
  id: number
  text: string
  options: Option[]
}

export const questions: Question[] = 
[
  {
    "id": 1,
    "text": "Hoe voel jij je in een kamer vol onbekenden?",
    "options": [
      {
        "id": "A",
        "text": "Enthousiast en energiek",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Nieuwsgierig, maar een beetje afwachtend",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Neutraal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ongemakkelijk en teruggetrokken",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 2,
    "text": "Hoe ga jij om met afwijzing?",
    "options": [
      {
        "id": "A",
        "text": "Zie ik als leerpunt",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Hangt van de situatie af",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Het raakt me wel, maar ik herstel snel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig en kan er lang mee zitten",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 3,
    "text": "Wat typeert jou het meest in een team?",
    "options": [
      {
        "id": "A",
        "text": "De initiatiefnemer",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "De verbinder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "De rustige uitvoerder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "De observator",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 4,
    "text": "Als je een doel stelt, dan\u2026",
    "options": [
      {
        "id": "A",
        "text": "Maak ik een plan en werk ik er hard naartoe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Blijf ik gefocust, maar flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Laat ik het op me afkomen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Verlies ik snel de motivatie",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 5,
    "text": "Hoe reageer je op verandering?",
    "options": [
      {
        "id": "A",
        "text": "Ik pas me makkelijk aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik zoek eerst duidelijkheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik hou liever van structuur",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik raak snel uit balans",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 6,
    "text": "Wat is jouw eerste instinct in conflictsituaties?",
    "options": [
      {
        "id": "A",
        "text": "Ik ga het gesprek aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik probeer te bemiddelen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik wacht af tot het overwaait",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik trek me terug",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 7,
    "text": "Je werkdag is onverwacht anders dan gepland\u2026",
    "options": [
      {
        "id": "A",
        "text": "Geen probleem, ik ben flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik prioriteer opnieuw",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik raak wat gestrest",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 8,
    "text": "Hoe goed kun je omgaan met druk?",
    "options": [
      {
        "id": "A",
        "text": "Ik floreer onder druk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik functioneer prima",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik kan het aan, maar word moe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het stressvol",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 9,
    "text": "Hoe ziet jouw ideale werkomgeving eruit?",
    "options": [
      {
        "id": "A",
        "text": "Dynamisch en sociaal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Resultaatgericht en duidelijk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Structuur en voorspelbaarheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Rustig en individueel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 10,
    "text": "Hoe vaak stel jij vragen tijdens gesprekken?",
    "options": [
      {
        "id": "A",
        "text": "Vaak \u2013 ik wil de ander goed begrijpen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Soms \u2013 als ik iets nodig heb",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Af en toe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Zelden \u2013 ik praat liever zelf",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 11,
    "text": "Hoe voel jij je in een kamer vol onbekenden?",
    "options": [
      {
        "id": "A",
        "text": "Enthousiast en energiek",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Nieuwsgierig, maar een beetje afwachtend",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Neutraal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ongemakkelijk en teruggetrokken",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 12,
    "text": "Hoe ga jij om met afwijzing?",
    "options": [
      {
        "id": "A",
        "text": "Zie ik als leerpunt",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Hangt van de situatie af",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Het raakt me wel, maar ik herstel snel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig en kan er lang mee zitten",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 13,
    "text": "Wat typeert jou het meest in een team?",
    "options": [
      {
        "id": "A",
        "text": "De initiatiefnemer",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "De verbinder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "De rustige uitvoerder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "De observator",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 14,
    "text": "Als je een doel stelt, dan\u2026",
    "options": [
      {
        "id": "A",
        "text": "Maak ik een plan en werk ik er hard naartoe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Blijf ik gefocust, maar flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Laat ik het op me afkomen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Verlies ik snel de motivatie",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 15,
    "text": "Hoe reageer je op verandering?",
    "options": [
      {
        "id": "A",
        "text": "Ik pas me makkelijk aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik zoek eerst duidelijkheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik hou liever van structuur",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik raak snel uit balans",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 16,
    "text": "Wat is jouw eerste instinct in conflictsituaties?",
    "options": [
      {
        "id": "A",
        "text": "Ik ga het gesprek aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik probeer te bemiddelen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik wacht af tot het overwaait",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik trek me terug",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 17,
    "text": "Je werkdag is onverwacht anders dan gepland\u2026",
    "options": [
      {
        "id": "A",
        "text": "Geen probleem, ik ben flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik prioriteer opnieuw",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik raak wat gestrest",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 18,
    "text": "Hoe goed kun je omgaan met druk?",
    "options": [
      {
        "id": "A",
        "text": "Ik floreer onder druk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik functioneer prima",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik kan het aan, maar word moe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het stressvol",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 19,
    "text": "Hoe ziet jouw ideale werkomgeving eruit?",
    "options": [
      {
        "id": "A",
        "text": "Dynamisch en sociaal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Resultaatgericht en duidelijk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Structuur en voorspelbaarheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Rustig en individueel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 20,
    "text": "Hoe vaak stel jij vragen tijdens gesprekken?",
    "options": [
      {
        "id": "A",
        "text": "Vaak \u2013 ik wil de ander goed begrijpen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Soms \u2013 als ik iets nodig heb",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Af en toe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Zelden \u2013 ik praat liever zelf",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 21,
    "text": "Hoe voel jij je in een kamer vol onbekenden?",
    "options": [
      {
        "id": "A",
        "text": "Enthousiast en energiek",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Nieuwsgierig, maar een beetje afwachtend",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Neutraal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ongemakkelijk en teruggetrokken",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 22,
    "text": "Hoe ga jij om met afwijzing?",
    "options": [
      {
        "id": "A",
        "text": "Zie ik als leerpunt",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Hangt van de situatie af",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Het raakt me wel, maar ik herstel snel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig en kan er lang mee zitten",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 23,
    "text": "Wat typeert jou het meest in een team?",
    "options": [
      {
        "id": "A",
        "text": "De initiatiefnemer",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "De verbinder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "De rustige uitvoerder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "De observator",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 24,
    "text": "Als je een doel stelt, dan\u2026",
    "options": [
      {
        "id": "A",
        "text": "Maak ik een plan en werk ik er hard naartoe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Blijf ik gefocust, maar flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Laat ik het op me afkomen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Verlies ik snel de motivatie",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 25,
    "text": "Hoe reageer je op verandering?",
    "options": [
      {
        "id": "A",
        "text": "Ik pas me makkelijk aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik zoek eerst duidelijkheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik hou liever van structuur",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik raak snel uit balans",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 26,
    "text": "Wat is jouw eerste instinct in conflictsituaties?",
    "options": [
      {
        "id": "A",
        "text": "Ik ga het gesprek aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik probeer te bemiddelen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik wacht af tot het overwaait",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik trek me terug",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 27,
    "text": "Je werkdag is onverwacht anders dan gepland\u2026",
    "options": [
      {
        "id": "A",
        "text": "Geen probleem, ik ben flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik prioriteer opnieuw",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik raak wat gestrest",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 28,
    "text": "Hoe goed kun je omgaan met druk?",
    "options": [
      {
        "id": "A",
        "text": "Ik floreer onder druk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik functioneer prima",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik kan het aan, maar word moe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het stressvol",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 29,
    "text": "Hoe ziet jouw ideale werkomgeving eruit?",
    "options": [
      {
        "id": "A",
        "text": "Dynamisch en sociaal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Resultaatgericht en duidelijk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Structuur en voorspelbaarheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Rustig en individueel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 30,
    "text": "Hoe vaak stel jij vragen tijdens gesprekken?",
    "options": [
      {
        "id": "A",
        "text": "Vaak \u2013 ik wil de ander goed begrijpen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Soms \u2013 als ik iets nodig heb",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Af en toe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Zelden \u2013 ik praat liever zelf",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 31,
    "text": "Hoe voel jij je in een kamer vol onbekenden?",
    "options": [
      {
        "id": "A",
        "text": "Enthousiast en energiek",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Nieuwsgierig, maar een beetje afwachtend",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Neutraal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ongemakkelijk en teruggetrokken",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 32,
    "text": "Hoe ga jij om met afwijzing?",
    "options": [
      {
        "id": "A",
        "text": "Zie ik als leerpunt",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Hangt van de situatie af",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Het raakt me wel, maar ik herstel snel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig en kan er lang mee zitten",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 33,
    "text": "Wat typeert jou het meest in een team?",
    "options": [
      {
        "id": "A",
        "text": "De initiatiefnemer",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "De verbinder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "De rustige uitvoerder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "De observator",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 34,
    "text": "Als je een doel stelt, dan\u2026",
    "options": [
      {
        "id": "A",
        "text": "Maak ik een plan en werk ik er hard naartoe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Blijf ik gefocust, maar flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Laat ik het op me afkomen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Verlies ik snel de motivatie",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 35,
    "text": "Hoe reageer je op verandering?",
    "options": [
      {
        "id": "A",
        "text": "Ik pas me makkelijk aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik zoek eerst duidelijkheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik hou liever van structuur",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik raak snel uit balans",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 36,
    "text": "Wat is jouw eerste instinct in conflictsituaties?",
    "options": [
      {
        "id": "A",
        "text": "Ik ga het gesprek aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik probeer te bemiddelen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik wacht af tot het overwaait",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik trek me terug",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 37,
    "text": "Je werkdag is onverwacht anders dan gepland\u2026",
    "options": [
      {
        "id": "A",
        "text": "Geen probleem, ik ben flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik prioriteer opnieuw",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik raak wat gestrest",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 38,
    "text": "Hoe goed kun je omgaan met druk?",
    "options": [
      {
        "id": "A",
        "text": "Ik floreer onder druk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik functioneer prima",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik kan het aan, maar word moe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het stressvol",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 39,
    "text": "Hoe ziet jouw ideale werkomgeving eruit?",
    "options": [
      {
        "id": "A",
        "text": "Dynamisch en sociaal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Resultaatgericht en duidelijk",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Structuur en voorspelbaarheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Rustig en individueel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 40,
    "text": "Hoe vaak stel jij vragen tijdens gesprekken?",
    "options": [
      {
        "id": "A",
        "text": "Vaak \u2013 ik wil de ander goed begrijpen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Soms \u2013 als ik iets nodig heb",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Af en toe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Zelden \u2013 ik praat liever zelf",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 41,
    "text": "Hoe voel jij je in een kamer vol onbekenden?",
    "options": [
      {
        "id": "A",
        "text": "Enthousiast en energiek",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Nieuwsgierig, maar een beetje afwachtend",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Neutraal",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ongemakkelijk en teruggetrokken",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 42,
    "text": "Hoe ga jij om met afwijzing?",
    "options": [
      {
        "id": "A",
        "text": "Zie ik als leerpunt",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Hangt van de situatie af",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Het raakt me wel, maar ik herstel snel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik vind het lastig en kan er lang mee zitten",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 43,
    "text": "Wat typeert jou het meest in een team?",
    "options": [
      {
        "id": "A",
        "text": "De initiatiefnemer",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "De verbinder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "De rustige uitvoerder",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "De observator",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 44,
    "text": "Als je een doel stelt, dan\u2026",
    "options": [
      {
        "id": "A",
        "text": "Maak ik een plan en werk ik er hard naartoe",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Blijf ik gefocust, maar flexibel",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Laat ik het op me afkomen",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Verlies ik snel de motivatie",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  },
  {
    "id": 45,
    "text": "Hoe reageer je op verandering?",
    "options": [
      {
        "id": "A",
        "text": "Ik pas me makkelijk aan",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "B",
        "text": "Ik zoek eerst duidelijkheid",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "C",
        "text": "Ik hou liever van structuur",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      },
      {
        "id": "D",
        "text": "Ik raak snel uit balans",
        "personalityScore": {
          "extraversion": 0,
          "agreeableness": 0,
          "conscientiousness": 0,
          "neuroticism": 0,
          "openness": 0
        },
        "salesScore": 0,
        "experienceScore": 0,
        "socialDesirabilityScore": 0
      }
    ]
  }
];
