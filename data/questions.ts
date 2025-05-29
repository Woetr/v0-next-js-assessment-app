// OMG Sales Assessment Model - Gebaseerd op bewezen sales assessment methodologie
export type SalesDNA = {
  willToSell: number // Bereidheid om te verkopen
  needForApproval: number // Behoefte aan goedkeuring (reverse scored)
  nonSupportiveBuyingCycle: number // Omgaan met niet-ondersteunende koopprocessen
}

export type SalesCompetencies = {
  hunting: number // Nieuwe klanten vinden
  consultativeSelling: number // Consultative verkoop
  qualifying: number // Kwalificeren van prospects
  closingSkills: number // Afsluitvaardigheden
  accountManagement: number // Accountbeheer
  presentationSkills: number // Presentatievaardigheden
}

export type SalesAttributes = {
  desire: number // Verlangen naar succes
  commitment: number // Toewijding
  responsibility: number // Verantwoordelijkheid
  outlook: number // Positieve instelling
  motivation: number // Motivatie
  selfEsteem: number // Zelfvertrouwen
}

export type BehavioralTraits = {
  resilience: number // Veerkracht
  adaptability: number // Aanpassingsvermogen
  empathy: number // Empathie
  assertiveness: number // Assertiviteit
  persistence: number // Volharding
  communication: number // Communicatievaardigheden
}

export type MotivationalDrivers = {
  achievement: number // Prestatiegerichtheid
  recognition: number // Erkenning
  autonomy: number // Autonomie
  growth: number // Groei en ontwikkeling
  security: number // Zekerheid
  relationships: number // Relaties
}

export type ComprehensiveScores = {
  salesDNA: SalesDNA
  competencies: SalesCompetencies
  attributes: SalesAttributes
  behavioral: BehavioralTraits
  motivational: MotivationalDrivers
  overallScore: number
  reliability: number
}

// Import SJT and Cognitive types
export type { SJTScores, CognitiveScores } from "./sjt-questions"
export type { SJTScores as SJTScoresType } from "./cognitive-questions"

export type EnhancedAssessmentScores = {
  traditional: ComprehensiveScores
  sjt: any // Will be imported from SJT module
  cognitive: any // Will be imported from Cognitive module
  combined: number
  reliability: number
}

export type Question = {
  id: number
  text: string
  category: "dna" | "competency" | "attribute" | "behavioral" | "motivational" | "sjt" | "cognitive"
  timeLimit?: number
  options: Option[]
  type?: "numerical" | "verbal" | "logical" | "spatial" // For cognitive questions
  correctAnswer?: string // For cognitive questions
  difficulty?: 1 | 2 | 3 | 4 | 5 // For cognitive questions
  scenario?: string // For SJT questions
  situation?: string // For SJT questions
}

export type Option = {
  id: string
  text: string
  scores?: {
    // Sales DNA
    willToSell?: number
    needForApproval?: number
    nonSupportiveBuyingCycle?: number
    // Competencies
    hunting?: number
    consultativeSelling?: number
    qualifying?: number
    closingSkills?: number
    accountManagement?: number
    presentationSkills?: number
    // Attributes
    desire?: number
    commitment?: number
    responsibility?: number
    outlook?: number
    motivation?: number
    selfEsteem?: number
    // Behavioral
    resilience?: number
    adaptability?: number
    empathy?: number
    assertiveness?: number
    persistence?: number
    communication?: number
    // Motivational
    achievement?: number
    recognition?: number
    autonomy?: number
    growth?: number
    security?: number
    relationships?: number
    // SJT Scores
    decisionMaking?: number
    stressManagement?: number
    customerFocus?: number
    problemSolving?: number
    leadership?: number
    teamwork?: number
  }
  socialDesirabilityFlag?: boolean
  reverseScored?: boolean
  isCorrect?: boolean // For cognitive questions
  effectiveness?: number // For SJT questions
  reasoning?: string // For SJT questions
  action?: string // For SJT questions
}

export const questions: Question[] = [
  // SALES DNA VRAGEN (1-15)
  {
    id: 1,
    text: "Een prospect zegt: 'Ik moet dit eerst met mijn team bespreken.' Wat is je eerste reactie?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik vraag wanneer we kunnen spreken nadat ze hebben overlegd.",
        scores: { willToSell: 2, needForApproval: 1, qualifying: 2 },
      },
      {
        id: "B",
        text: "Ik vraag wie er bij de beslissing betrokken zijn en wat hun rol is.",
        scores: { willToSell: 4, qualifying: 4, nonSupportiveBuyingCycle: 3 },
      },
      {
        id: "C",
        text: "Ik accepteer dit en wacht af tot ze contact opnemen.",
        scores: { willToSell: 1, needForApproval: 4, nonSupportiveBuyingCycle: 1 },
        reverseScored: true,
      },
      {
        id: "D",
        text: "Ik vraag wat er nodig is om vandaag een beslissing te nemen.",
        scores: { willToSell: 4, closingSkills: 4, assertiveness: 3 },
      },
    ],
  },
  {
    id: 2,
    text: "Hoe ga je om met een klant die zegt: 'Jullie prijs is te hoog'?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik vraag wat hun budget is en probeer daaraan te voldoen.",
        scores: { willToSell: 2, needForApproval: 3, qualifying: 2 },
      },
      {
        id: "B",
        text: "Ik leg uit waarom onze prijs gerechtvaardigd is door de waarde.",
        scores: { willToSell: 4, consultativeSelling: 4, assertiveness: 4 },
      },
      {
        id: "C",
        text: "Ik bied direct een korting aan om de deal te redden.",
        scores: { willToSell: 2, needForApproval: 4, closingSkills: 1 },
        reverseScored: true,
      },
      {
        id: "D",
        text: "Ik vraag wat ze vergelijken en onderzoek hun criteria.",
        scores: { willToSell: 4, qualifying: 4, consultativeSelling: 3 },
      },
    ],
  },
  {
    id: 3,
    text: "Een belangrijke prospect reageert niet op je emails en telefoontjes. Wat doe je?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik stop met contact opnemen om niet opdringerig te zijn.",
        scores: { willToSell: 1, needForApproval: 4, persistence: 1 },
        reverseScored: true,
      },
      {
        id: "B",
        text: "Ik probeer via een andere route contact te krijgen (LinkedIn, collega's).",
        scores: { willToSell: 4, hunting: 4, persistence: 4, adaptability: 3 },
      },
      {
        id: "C",
        text: "Ik stuur nog één email en wacht dan af.",
        scores: { willToSell: 2, needForApproval: 3, persistence: 2 },
      },
      {
        id: "D",
        text: "Ik ga langs op kantoor voor een persoonlijk gesprek.",
        scores: { willToSell: 4, assertiveness: 4, persistence: 4 },
      },
    ],
  },
  {
    id: 4,
    text: "Je hebt een deal bijna rond, maar de klant wil nog een week bedenktijd. Hoe reageer je?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Natuurlijk, neem de tijd die je nodig hebt.",
        scores: { willToSell: 1, needForApproval: 4, closingSkills: 1 },
        reverseScored: true,
      },
      {
        id: "B",
        text: "Ik vraag wat er nog onduidelijk is en probeer dat weg te nemen.",
        scores: { willToSell: 4, closingSkills: 4, consultativeSelling: 3 },
      },
      {
        id: "C",
        text: "Ik bied een extra voordeel als ze vandaag tekenen.",
        scores: { willToSell: 3, closingSkills: 3, assertiveness: 2 },
      },
      {
        id: "D",
        text: "Ik vraag wat er kan gebeuren in die week dat hun situatie verandert.",
        scores: { willToSell: 4, qualifying: 4, nonSupportiveBuyingCycle: 4 },
      },
    ],
  },
  {
    id: 5,
    text: "Een klant zegt: 'We zijn heel tevreden met onze huidige leverancier.' Wat is je reactie?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Dat is fijn om te horen. Misschien kunnen we in de toekomst samenwerken.",
        scores: { willToSell: 1, needForApproval: 4, hunting: 1 },
        reverseScored: true,
      },
      {
        id: "B",
        text: "Wat zou er moeten veranderen om jullie nog tevredener te maken?",
        scores: { willToSell: 4, hunting: 4, consultativeSelling: 4 },
      },
      {
        id: "C",
        text: "Ik begrijp het. Mag ik vragen wat jullie het meest waarderen?",
        scores: { willToSell: 3, hunting: 3, qualifying: 3, empathy: 3 },
      },
      {
        id: "D",
        text: "Dat dachten onze andere klanten ook voordat ze overstapten.",
        scores: { willToSell: 3, hunting: 2, assertiveness: 4, empathy: 1 },
      },
    ],
  },

  // COMPETENCY VRAGEN (6-20)
  {
    id: 6,
    text: "Hoe identificeer je nieuwe prospects in een markt waar je nog niet actief bent?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik onderzoek online en maak een lijst van potentiële bedrijven.",
        scores: { hunting: 2, qualifying: 2, adaptability: 2 },
      },
      {
        id: "B",
        text: "Ik ga naar netwerkevenementen en bouw relaties op.",
        scores: { hunting: 4, communication: 4, relationships: 4 },
      },
      {
        id: "C",
        text: "Ik analyseer wie de concurrentie bedient en benader dezelfde doelgroep.",
        scores: { hunting: 4, qualifying: 4, adaptability: 3 },
      },
      {
        id: "D",
        text: "Ik wacht tot prospects mij benaderen.",
        scores: { hunting: 1, adaptability: 1, willToSell: 1 },
        reverseScored: false,
      },
    ],
  },
  {
    id: 7,
    text: "Een prospect vraagt naar een functionaliteit die jullie product niet heeft. Hoe handel je dit af?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik ben eerlijk en zeg dat we dit niet hebben.",
        scores: { consultativeSelling: 2, responsibility: 4, empathy: 3 },
      },
      {
        id: "B",
        text: "Ik vraag waarom deze functionaliteit belangrijk is voor hen.",
        scores: { consultativeSelling: 4, qualifying: 4, empathy: 4 },
      },
      {
        id: "C",
        text: "Ik laat zien hoe onze andere functies dit compenseren.",
        scores: { consultativeSelling: 4, presentationSkills: 4, adaptability: 3 },
      },
      {
        id: "D",
        text: "Ik beloof te onderzoeken of we dit kunnen ontwikkelen.",
        scores: { consultativeSelling: 2, responsibility: 2, needForApproval: 3 },
      },
    ],
  },
  {
    id: 8,
    text: "Hoe kwalificeer je of een prospect echt koopintentie heeft?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik vraag direct of ze van plan zijn dit jaar aan te schaffen.",
        scores: { qualifying: 3, assertiveness: 4, willToSell: 3 },
      },
      {
        id: "B",
        text: "Ik onderzoek hun huidige situatie en pijnpunten.",
        scores: { qualifying: 4, consultativeSelling: 4, empathy: 3 },
      },
      {
        id: "C",
        text: "Ik vraag naar hun budget en besluitvormingsproces.",
        scores: { qualifying: 4, willToSell: 4, assertiveness: 3 },
      },
      {
        id: "D",
        text: "Ik kijk naar hun gedrag en betrokkenheid tijdens gesprekken.",
        scores: { qualifying: 3, empathy: 4, communication: 3 },
      },
    ],
  },
  {
    id: 9,
    text: "Een klant twijfelt tussen jullie en een concurrent. Hoe sluit je deze deal af?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik maak een vergelijkingstabel van alle voordelen.",
        scores: { closingSkills: 3, presentationSkills: 4, consultativeSelling: 2 },
      },
      {
        id: "B",
        text: "Ik vraag wat voor hen de doorslag zou geven.",
        scores: { closingSkills: 4, qualifying: 4, consultativeSelling: 4 },
      },
      {
        id: "C",
        text: "Ik bied een beperkte aanbieding om urgentie te creëren.",
        scores: { closingSkills: 3, assertiveness: 3, willToSell: 3 },
      },
      {
        id: "D",
        text: "Ik organiseer een referentiegesprek met een tevreden klant.",
        scores: { closingSkills: 4, accountManagement: 3, consultativeSelling: 4 },
      },
    ],
  },
  {
    id: 10,
    text: "Hoe bouw je een langdurige relatie op met een nieuwe grote klant?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik plan regelmatige check-ins en blijf in contact.",
        scores: { accountManagement: 2, relationships: 3, commitment: 2 },
      },
      {
        id: "B",
        text: "Ik leer hun business kennen en word een trusted advisor.",
        scores: { accountManagement: 4, consultativeSelling: 4, empathy: 4 },
      },
      {
        id: "C",
        text: "Ik zorg voor uitstekende service en snelle reacties.",
        scores: { accountManagement: 3, responsibility: 3, commitment: 3 },
      },
      {
        id: "D",
        text: "Ik bel alleen als ik iets te verkopen heb.",
        scores: { accountManagement: 1, relationships: 1, empathy: 1 },
        reverseScored: false,
      },
    ],
  },

  // ATTRIBUTES VRAGEN (11-25)
  {
    id: 11,
    text: "Wat drijft jou het meest om elke dag je best te doen in sales?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Het behalen van mijn targets en bonussen.",
        scores: { desire: 4, achievement: 4, motivation: 3 },
      },
      {
        id: "B",
        text: "Het helpen van klanten met hun uitdagingen.",
        scores: { desire: 3, empathy: 4, relationships: 4 },
      },
      {
        id: "C",
        text: "De competitie winnen van collega's en concurrenten.",
        scores: { desire: 4, achievement: 4, recognition: 3 },
      },
      {
        id: "D",
        text: "Mezelf continu ontwikkelen en groeien.",
        scores: { desire: 3, growth: 4, motivation: 4 },
      },
    ],
  },
  {
    id: 12,
    text: "Je hebt een slechte maand gehad met weinig verkopen. Hoe ga je hiermee om?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik analyseer wat er mis ging en pas mijn aanpak aan.",
        scores: { responsibility: 4, resilience: 4, growth: 4 },
      },
      {
        id: "B",
        text: "Ik werk harder en maak meer uren om in te halen.",
        scores: { commitment: 4, persistence: 4, achievement: 3 },
      },
      {
        id: "C",
        text: "Ik zoek hulp bij mijn manager of ervaren collega's.",
        scores: { responsibility: 3, growth: 3, needForApproval: 2 },
      },
      {
        id: "D",
        text: "Ik blijf positief en weet dat volgende maand beter wordt.",
        scores: { outlook: 4, resilience: 3, motivation: 3 },
      },
    ],
  },
  {
    id: 13,
    text: "Hoe ga je om met kritiek van een klant op je aanpak?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik luister aandachtig en vraag om specifieke feedback.",
        scores: { responsibility: 4, empathy: 4, growth: 4 },
      },
      {
        id: "B",
        text: "Ik leg uit waarom ik deze aanpak heb gekozen.",
        scores: { selfEsteem: 3, assertiveness: 3, responsibility: 2 },
      },
      {
        id: "C",
        text: "Ik verontschuldig me en pas mijn aanpak direct aan.",
        scores: { responsibility: 3, adaptability: 4, needForApproval: 3 },
      },
      {
        id: "D",
        text: "Ik bedank hen voor de feedback en gebruik het om te verbeteren.",
        scores: { responsibility: 4, growth: 4, outlook: 4 },
      },
    ],
  },
  {
    id: 14,
    text: "Wat doe je als je merkt dat je een onrealistische belofte hebt gedaan aan een klant?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik probeer alsnog te leveren wat ik beloofd heb.",
        scores: { commitment: 4, persistence: 4, responsibility: 2 },
      },
      {
        id: "B",
        text: "Ik bel de klant direct en leg eerlijk de situatie uit.",
        scores: { responsibility: 4, empathy: 4, selfEsteem: 4 },
      },
      {
        id: "C",
        text: "Ik zoek een alternatieve oplossing die wel haalbaar is.",
        scores: { responsibility: 4, adaptability: 4, consultativeSelling: 3 },
      },
      {
        id: "D",
        text: "Ik betrek mijn manager om te helpen een oplossing te vinden.",
        scores: { responsibility: 3, commitment: 3, needForApproval: 2 },
      },
    ],
  },
  {
    id: 15,
    text: "Hoe motiveer je jezelf na een grote afwijzing?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik focus direct op de volgende kans.",
        scores: { resilience: 4, outlook: 4, persistence: 3 },
      },
      {
        id: "B",
        text: "Ik analyseer wat ik kan leren van deze ervaring.",
        scores: { resilience: 4, growth: 4, responsibility: 3 },
      },
      {
        id: "C",
        text: "Ik herinner mezelf aan eerdere successen.",
        scores: { selfEsteem: 4, outlook: 4, motivation: 3 },
      },
      {
        id: "D",
        text: "Ik neem even pauze en kom dan sterker terug.",
        scores: { resilience: 3, selfEsteem: 3, adaptability: 3 },
      },
    ],
  },

  // BEHAVIORAL VRAGEN (16-35)
  {
    id: 16,
    text: "Een klant wordt boos omdat een levering te laat is. Hoe reageer je?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik blijf kalm en luister naar hun frustratie.",
        scores: { resilience: 4, empathy: 4, communication: 4 },
      },
      {
        id: "B",
        text: "Ik verontschuldig me en leg uit wat er mis ging.",
        scores: { responsibility: 4, empathy: 3, communication: 3 },
      },
      {
        id: "C",
        text: "Ik focus op een oplossing en compensatie.",
        scores: { adaptability: 4, responsibility: 4, consultativeSelling: 3 },
      },
      {
        id: "D",
        text: "Ik verwijs hen door naar onze klantenservice.",
        scores: { adaptability: 2, responsibility: 2, needForApproval: 3 },
      },
    ],
  },
  {
    id: 17,
    text: "Je moet plotseling een presentatie geven aan het management. Hoe bereid je je voor?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik maak snel een overzicht van de belangrijkste punten.",
        scores: { adaptability: 4, assertiveness: 3, presentationSkills: 3 },
      },
      {
        id: "B",
        text: "Ik vraag om meer tijd om me goed voor te bereiden.",
        scores: { responsibility: 3, selfEsteem: 2, needForApproval: 2 },
      },
      {
        id: "C",
        text: "Ik focus op verhalen en voorbeelden die ik ken.",
        scores: { adaptability: 4, communication: 4, selfEsteem: 3 },
      },
      {
        id: "D",
        text: "Ik vraag een collega om me te helpen.",
        scores: { adaptability: 3, relationships: 3, needForApproval: 3 },
      },
    ],
  },
  {
    id: 18,
    text: "Hoe ga je om met een collega die constant jouw leads probeert over te nemen?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik spreek hem direct aan over dit gedrag.",
        scores: { assertiveness: 4, responsibility: 4, selfEsteem: 4 },
      },
      {
        id: "B",
        text: "Ik documenteer alles en ga naar de manager.",
        scores: { responsibility: 3, assertiveness: 2, security: 3 },
      },
      {
        id: "C",
        text: "Ik probeer samen te werken in plaats van te concurreren.",
        scores: { empathy: 4, relationships: 4, adaptability: 3 },
      },
      {
        id: "D",
        text: "Ik zorg dat ik sneller ben en beter mijn leads bescherm.",
        scores: { assertiveness: 3, persistence: 4, achievement: 3 },
      },
    ],
  },
  {
    id: 19,
    text: "Een belangrijke klant vraagt je om iets te doen wat tegen het bedrijfsbeleid ingaat. Wat doe je?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik leg uit waarom dit niet mogelijk is en bied alternatieven.",
        scores: { responsibility: 4, assertiveness: 4, consultativeSelling: 3 },
      },
      {
        id: "B",
        text: "Ik doe het stiekem om de klant tevreden te houden.",
        scores: { willToSell: 2, responsibility: 1, needForApproval: 4 },
        reverseScored: true,
      },
      {
        id: "C",
        text: "Ik vraag mijn manager om een uitzondering.",
        scores: { responsibility: 3, adaptability: 3, relationships: 2 },
      },
      {
        id: "D",
        text: "Ik zoek een creatieve oplossing binnen de regels.",
        scores: { adaptability: 4, responsibility: 4, consultativeSelling: 4 },
      },
    ],
  },
  {
    id: 20,
    text: "Hoe bouw je rapport op met iemand die heel anders is dan jij?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik observeer hun stijl en pas mijn aanpak daarop aan.",
        scores: { empathy: 4, adaptability: 4, communication: 4 },
      },
      {
        id: "B",
        text: "Ik zoek naar gemeenschappelijke interesses.",
        scores: { empathy: 3, relationships: 4, communication: 3 },
      },
      {
        id: "C",
        text: "Ik blijf mezelf en hoop dat ze me accepteren.",
        scores: { selfEsteem: 3, empathy: 2, adaptability: 1 },
      },
      {
        id: "D",
        text: "Ik stel veel vragen om hen beter te leren kennen.",
        scores: { empathy: 4, communication: 4, qualifying: 3 },
      },
    ],
  },

  // MOTIVATIONAL VRAGEN (21-45)
  {
    id: 21,
    text: "Wat zou je het meest motiveren in een nieuwe sales rol?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Een hoog basissalaris en zekerheid.",
        scores: { security: 4, achievement: 2, autonomy: 1 },
      },
      {
        id: "B",
        text: "Onbeperkte commissiemogelijkheden.",
        scores: { achievement: 4, recognition: 3, autonomy: 3 },
      },
      {
        id: "C",
        text: "Vrijheid om mijn eigen aanpak te bepalen.",
        scores: { autonomy: 4, growth: 3, achievement: 3 },
      },
      {
        id: "D",
        text: "Werken met een geweldig team.",
        scores: { relationships: 4, security: 3, recognition: 2 },
      },
    ],
  },
  {
    id: 22,
    text: "Hoe wil je het liefst erkend worden voor je prestaties?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Door publieke erkenning en awards.",
        scores: { recognition: 4, achievement: 3, relationships: 2 },
      },
      {
        id: "B",
        text: "Door financiële beloningen en bonussen.",
        scores: { achievement: 4, recognition: 2, security: 3 },
      },
      {
        id: "C",
        text: "Door meer verantwoordelijkheden en autonomie.",
        scores: { growth: 4, autonomy: 4, achievement: 3 },
      },
      {
        id: "D",
        text: "Door waardering van klanten en collega's.",
        scores: { relationships: 4, recognition: 3, empathy: 3 },
      },
    ],
  },
  {
    id: 23,
    text: "Wat is voor jou de ideale werkbalans?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Hard werken met duidelijke grenzen tussen werk en privé.",
        scores: { security: 4, autonomy: 3, achievement: 2 },
      },
      {
        id: "B",
        text: "Flexibel werken wanneer en waar het nodig is.",
        scores: { autonomy: 4, adaptability: 3, growth: 3 },
      },
      {
        id: "C",
        text: "Intensief werken met veel vrije tijd tussen projecten.",
        scores: { achievement: 3, autonomy: 3, security: 2 },
      },
      {
        id: "D",
        text: "Samen werken in een hecht team met vaste structuur.",
        scores: { relationships: 4, security: 4, autonomy: 1 },
      },
    ],
  },
  {
    id: 24,
    text: "Welk type uitdaging motiveert jou het meest?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Nieuwe markten of producten ontdekken.",
        scores: { growth: 4, achievement: 4, autonomy: 3 },
      },
      {
        id: "B",
        text: "Complexe deals met grote klanten.",
        scores: { achievement: 4, recognition: 3, growth: 3 },
      },
      {
        id: "C",
        text: "Langdurige relaties opbouwen en onderhouden.",
        scores: { relationships: 4, security: 3, empathy: 3 },
      },
      {
        id: "D",
        text: "Targets overtreffen en records breken.",
        scores: { achievement: 4, recognition: 4, growth: 2 },
      },
    ],
  },
  {
    id: 25,
    text: "Hoe zie je je ideale carrièrepad?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Doorgroeien naar sales management.",
        scores: { growth: 4, recognition: 4, relationships: 3 },
      },
      {
        id: "B",
        text: "Specialist worden in een specifiek gebied.",
        scores: { growth: 4, autonomy: 3, security: 3 },
      },
      {
        id: "C",
        text: "Eigen bedrijf starten.",
        scores: { autonomy: 4, achievement: 4, growth: 4 },
      },
      {
        id: "D",
        text: "Stabiele positie met goede work-life balance.",
        scores: { security: 4, relationships: 3, autonomy: 2 },
      },
    ],
  },

  // Aanvullende vragen voor completere assessment (26-45)
  {
    id: 26,
    text: "Een prospect zegt dat ze geen budget hebben. Wat is je reactie?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik accepteer dit en vraag wanneer er wel budget komt.",
        scores: { willToSell: 1, needForApproval: 4, qualifying: 1 },
        reverseScored: true,
      },
      {
        id: "B",
        text: "Ik vraag wat er zou moeten gebeuren om budget vrij te maken.",
        scores: { willToSell: 4, qualifying: 4, nonSupportiveBuyingCycle: 4 },
      },
      {
        id: "C",
        text: "Ik laat zien wat de kosten zijn van niets doen.",
        scores: { willToSell: 4, consultativeSelling: 4, assertiveness: 3 },
      },
      {
        id: "D",
        text: "Ik bied een goedkopere optie aan.",
        scores: { willToSell: 2, needForApproval: 3, adaptability: 3 },
      },
    ],
  },
  {
    id: 27,
    text: "Hoe ga je om met een gatekeeper die je niet doorverbindt?",
    category: "competency",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik probeer de gatekeeper als bondgenoot te winnen.",
        scores: { hunting: 4, empathy: 4, relationships: 4 },
      },
      {
        id: "B",
        text: "Ik zoek een andere route naar de beslisser.",
        scores: { hunting: 4, persistence: 4, adaptability: 4 },
      },
      {
        id: "C",
        text: "Ik leg uit waarom het gesprek belangrijk is voor hun bedrijf.",
        scores: { hunting: 3, consultativeSelling: 4, assertiveness: 3 },
      },
      {
        id: "D",
        text: "Ik geef op en probeer een ander bedrijf.",
        scores: { hunting: 1, persistence: 1, resilience: 1 },
        reverseScored: true,
      },
    ],
  },
  {
    id: 28,
    text: "Wat doe je als een klant vraagt om een referentie die je niet kunt geven?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik ben eerlijk en leg uit waarom ik deze referentie niet kan delen.",
        scores: { responsibility: 4, selfEsteem: 4, empathy: 3 },
      },
      {
        id: "B",
        text: "Ik bied een alternatieve referentie die wel relevant is.",
        scores: { adaptability: 4, consultativeSelling: 4, responsibility: 3 },
      },
      {
        id: "C",
        text: "Ik beloof de referentie te regelen en hoop dat het lukt.",
        scores: { responsibility: 1, needForApproval: 4, selfEsteem: 2 },
        reverseScored: true,
      },
      {
        id: "D",
        text: "Ik vraag waarom deze specifieke referentie belangrijk is.",
        scores: { qualifying: 4, empathy: 4, consultativeSelling: 3 },
      },
    ],
  },
  {
    id: 29,
    text: "Hoe reageer je als een klant je product vergelijkt met een goedkopere concurrent?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik focus op de voordelen en meerwaarde van ons product.",
        scores: { assertiveness: 4, consultativeSelling: 4, selfEsteem: 3 },
      },
      {
        id: "B",
        text: "Ik vraag wat voor hen het belangrijkst is: prijs of waarde.",
        scores: { qualifying: 4, consultativeSelling: 4, empathy: 3 },
      },
      {
        id: "C",
        text: "Ik probeer onze prijs te verlagen om competitief te blijven.",
        scores: { needForApproval: 4, willToSell: 2, assertiveness: 1 },
        reverseScored: true,
      },
      {
        id: "D",
        text: "Ik onderzoek wat de concurrent precies biedt.",
        scores: { adaptability: 4, qualifying: 3, consultativeSelling: 3 },
      },
    ],
  },
  {
    id: 30,
    text: "Wat motiveert je om door te gaan na een reeks afwijzingen?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "De wetenschap dat elke 'nee' me dichter bij een 'ja' brengt.",
        scores: { resilience: 4, outlook: 4, persistence: 4 },
      },
      {
        id: "B",
        text: "Mijn financiële doelen en verplichtingen.",
        scores: { achievement: 4, security: 3, motivation: 3 },
      },
      {
        id: "C",
        text: "De uitdaging om mezelf te bewijzen.",
        scores: { achievement: 4, recognition: 3, selfEsteem: 3 },
      },
      {
        id: "D",
        text: "Het helpen van klanten die mijn product echt nodig hebben.",
        scores: { empathy: 4, relationships: 4, motivation: 4 },
      },
    ],
  },

  // Vervolg met meer vragen tot 45...
  {
    id: 31,
    text: "Hoe bereid je je voor op een gesprek met een zeer technische beslisser?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik bestudeer alle technische specificaties van ons product.",
        scores: { presentationSkills: 3, responsibility: 4, growth: 3 },
      },
      {
        id: "B",
        text: "Ik neem een technische expert mee naar het gesprek.",
        scores: { adaptability: 4, relationships: 3, consultativeSelling: 3 },
      },
      {
        id: "C",
        text: "Ik focus op business impact in plaats van technische details.",
        scores: { consultativeSelling: 4, assertiveness: 3, empathy: 3 },
      },
      {
        id: "D",
        text: "Ik leer de basis en stel veel vragen tijdens het gesprek.",
        scores: { adaptability: 4, empathy: 4, growth: 4 },
      },
    ],
  },
  {
    id: 32,
    text: "Een klant wil een demo, maar je product is nog niet klaar. Wat doe je?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik stel de demo uit tot het product klaar is.",
        scores: { responsibility: 3, willToSell: 1, needForApproval: 3 },
      },
      {
        id: "B",
        text: "Ik laat een demo zien van een vergelijkbaar product.",
        scores: { willToSell: 3, adaptability: 4, responsibility: 2 },
      },
      {
        id: "C",
        text: "Ik ben eerlijk over de status en bied alternatieven.",
        scores: { responsibility: 4, consultativeSelling: 4, empathy: 4 },
      },
      {
        id: "D",
        text: "Ik maak een conceptuele presentatie van wat het gaat worden.",
        scores: { willToSell: 4, adaptability: 4, presentationSkills: 4 },
      },
    ],
  },
  {
    id: 33,
    text: "Hoe ga je om met een klant die constant de prijs wil heronderhandelen?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik blijf vriendelijk maar houd vast aan onze prijs.",
        scores: { assertiveness: 4, resilience: 4, selfEsteem: 4 },
      },
      {
        id: "B",
        text: "Ik leg uit waarom onze prijs fair is en niet kan wijzigen.",
        scores: { assertiveness: 4, consultativeSelling: 3, responsibility: 4 },
      },
      {
        id: "C",
        text: "Ik geef kleine concessies om de relatie te behouden.",
        scores: { needForApproval: 3, relationships: 3, adaptability: 2 },
      },
      {
        id: "D",
        text: "Ik stel voor om de scope aan te passen voor een lagere prijs.",
        scores: { adaptability: 4, consultativeSelling: 4, assertiveness: 3 },
      },
    ],
  },
  {
    id: 34,
    text: "Wat is je aanpak bij het verkopen aan een committee van beslissers?",
    category: "competency",
    timeLimit: 45,
    options: [
      {
        id: "A",
        text: "Ik identificeer de echte beslisser en focus daarop.",
        scores: { qualifying: 4, hunting: 3, assertiveness: 3 },
      },
      {
        id: "B",
        text: "Ik zorg dat mijn boodschap relevant is voor iedereen.",
        scores: { presentationSkills: 4, empathy: 4, adaptability: 4 },
      },
      {
        id: "C",
        text: "Ik spreek iedereen individueel vooraf.",
        scores: { hunting: 4, relationships: 4, consultativeSelling: 4 },
      },
      {
        id: "D",
        text: "Ik maak een uitgebreide presentatie die alles dekt.",
        scores: { presentationSkills: 3, responsibility: 3, growth: 2 },
      },
    ],
  },
  {
    id: 35,
    text: "Hoe motiveer je jezelf tijdens een lange verkoopperiode zonder resultaten?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik focus op de activiteiten die ik wel kan controleren.",
        scores: { resilience: 4, responsibility: 4, outlook: 3 },
      },
      {
        id: "B",
        text: "Ik herinner mezelf aan mijn langetermijndoelen.",
        scores: { motivation: 4, commitment: 4, achievement: 3 },
      },
      {
        id: "C",
        text: "Ik zoek steun bij collega's en mijn manager.",
        scores: { relationships: 4, empathy: 3, needForApproval: 2 },
      },
      {
        id: "D",
        text: "Ik analyseer mijn aanpak en experimenteer met nieuwe tactieken.",
        scores: { growth: 4, adaptability: 4, responsibility: 3 },
      },
    ],
  },

  // Laatste 10 vragen (36-45) voor complete coverage
  {
    id: 36,
    text: "Een concurrent spreekt jouw klanten slecht over jullie. Hoe reageer je?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik spreek de concurrent direct aan over dit gedrag.",
        scores: { assertiveness: 4, responsibility: 3, selfEsteem: 4 },
      },
      {
        id: "B",
        text: "Ik focus op het versterken van mijn klantrelaties.",
        scores: { accountManagement: 4, relationships: 4, resilience: 3 },
      },
      {
        id: "C",
        text: "Ik documenteer alles en informeer mijn management.",
        scores: { responsibility: 4, security: 3, adaptability: 2 },
      },
      {
        id: "D",
        text: "Ik laat mijn resultaten voor zich spreken.",
        scores: { selfEsteem: 4, resilience: 4, achievement: 3 },
      },
    ],
  },
  {
    id: 37,
    text: "Wat doe je als je ontdekt dat een concurrent een betere oplossing heeft?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik focus op onze unieke voordelen en differentiatie.",
        scores: { assertiveness: 4, consultativeSelling: 4, selfEsteem: 3 },
      },
      {
        id: "B",
        text: "Ik ben eerlijk naar klanten over de verschillen.",
        scores: { responsibility: 4, empathy: 4, selfEsteem: 4 },
      },
      {
        id: "C",
        text: "Ik geef deze feedback door aan productmanagement.",
        scores: { responsibility: 4, growth: 3, relationships: 3 },
      },
      {
        id: "D",
        text: "Ik zoek naar klanten waar onze oplossing beter past.",
        scores: { adaptability: 4, qualifying: 4, resilience: 3 },
      },
    ],
  },
  {
    id: 38,
    text: "Hoe ga je om met een klant die altijd op het laatste moment afzegt?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik accepteer dit en blijf flexibel.",
        scores: { needForApproval: 4, willToSell: 1, adaptability: 2 },
        reverseScored: true,
      },
      {
        id: "B",
        text: "Ik spreek hen aan over de impact van dit gedrag.",
        scores: { willToSell: 4, assertiveness: 4, responsibility: 3 },
      },
      {
        id: "C",
        text: "Ik vraag naar de onderliggende oorzaak.",
        scores: { willToSell: 3, empathy: 4, qualifying: 4 },
      },
      {
        id: "D",
        text: "Ik stel voor om meetings anders in te plannen.",
        scores: { adaptability: 4, consultativeSelling: 3, relationships: 3 },
      },
    ],
  },
  {
    id: 39,
    text: "Wat is je ideale manier om nieuwe vaardigheden te leren?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Door training en cursussen te volgen.",
        scores: { growth: 4, security: 3, responsibility: 3 },
      },
      {
        id: "B",
        text: "Door te observeren en na te doen van succesvolle collega's.",
        scores: { growth: 4, relationships: 4, empathy: 3 },
      },
      {
        id: "C",
        text: "Door trial and error in echte situaties.",
        scores: { growth: 4, autonomy: 4, resilience: 3 },
      },
      {
        id: "D",
        text: "Door coaching en feedback van mijn manager.",
        scores: { growth: 4, relationships: 3, needForApproval: 2 },
      },
    ],
  },
  {
    id: 40,
    text: "Hoe ga je om met een klant die je niet vertrouwt?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik documenteer alles extra zorgvuldig.",
        scores: { responsibility: 4, security: 4, adaptability: 2 },
      },
      {
        id: "B",
        text: "Ik probeer de relatie te verbeteren door meer transparantie.",
        scores: { empathy: 4, relationships: 4, consultativeSelling: 3 },
      },
      {
        id: "C",
        text: "Ik betrek mijn manager bij belangrijke beslissingen.",
        scores: { responsibility: 3, security: 4, needForApproval: 2 },
      },
      {
        id: "D",
        text: "Ik blijf professioneel maar houd afstand.",
        scores: { selfEsteem: 3, responsibility: 3, adaptability: 3 },
      },
    ],
  },
  {
    id: 41,
    text: "Wat doe je als je merkt dat je quota dit jaar niet gaat halen?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik verdubbel mijn inspanningen in de laatste maanden.",
        scores: { commitment: 4, persistence: 4, achievement: 4 },
      },
      {
        id: "B",
        text: "Ik analyseer wat er mis ging en maak een plan voor volgend jaar.",
        scores: { responsibility: 4, growth: 4, resilience: 3 },
      },
      {
        id: "C",
        text: "Ik bespreek de situatie met mijn manager.",
        scores: { responsibility: 3, relationships: 3, needForApproval: 2 },
      },
      {
        id: "D",
        text: "Ik focus op het maximaliseren van wat nog mogelijk is.",
        scores: { resilience: 4, adaptability: 4, achievement: 3 },
      },
    ],
  },
  {
    id: 42,
    text: "Hoe zou je een product verkopen waar je zelf niet in gelooft?",
    category: "dna",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik zou dit product niet verkopen.",
        scores: { responsibility: 4, selfEsteem: 4, willToSell: 2 },
      },
      {
        id: "B",
        text: "Ik zou zoeken naar klanten waar het wel past.",
        scores: { willToSell: 3, qualifying: 4, adaptability: 4 },
      },
      {
        id: "C",
        text: "Ik zou proberen het product beter te begrijpen.",
        scores: { growth: 4, responsibility: 3, empathy: 3 },
      },
      {
        id: "D",
        text: "Ik zou eerlijk zijn over de beperkingen.",
        scores: { responsibility: 4, empathy: 4, consultativeSelling: 4 },
      },
    ],
  },
  {
    id: 43,
    text: "Wat is je aanpak bij het verkopen aan iemand die veel meer ervaring heeft dan jij?",
    category: "behavioral",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik erken hun expertise en leer van hen.",
        scores: { empathy: 4, growth: 4, relationships: 4 },
      },
      {
        id: "B",
        text: "Ik focus op wat ik wel kan bijdragen.",
        scores: { selfEsteem: 4, consultativeSelling: 3, assertiveness: 3 },
      },
      {
        id: "C",
        text: "Ik stel veel vragen om hun perspectief te begrijpen.",
        scores: { empathy: 4, qualifying: 4, communication: 4 },
      },
      {
        id: "D",
        text: "Ik breng een ervaren collega mee.",
        scores: { adaptability: 3, relationships: 3, needForApproval: 2 },
      },
    ],
  },
  {
    id: 44,
    text: "Hoe zou je omgaan met een ethisch dilemma in een verkoopsituatie?",
    category: "attribute",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Ik volg altijd mijn ethische principes, ongeacht de gevolgen.",
        scores: { responsibility: 4, selfEsteem: 4, outlook: 4 },
      },
      {
        id: "B",
        text: "Ik zoek advies bij mijn manager of collega's.",
        scores: { responsibility: 3, relationships: 4, growth: 3 },
      },
      {
        id: "C",
        text: "Ik weeg de voor- en nadelen af voor alle betrokkenen.",
        scores: { empathy: 4, responsibility: 3, adaptability: 3 },
      },
      {
        id: "D",
        text: "Ik kies voor de oplossing die het minste kwaad doet.",
        scores: { empathy: 4, responsibility: 4, adaptability: 2 },
      },
    ],
  },
  {
    id: 45,
    text: "Wat zou je het meest trots maken aan het einde van je carrière?",
    category: "motivational",
    timeLimit: 30,
    options: [
      {
        id: "A",
        text: "Dat ik de beste verkoper van mijn generatie was.",
        scores: { achievement: 4, recognition: 4, growth: 2 },
      },
      {
        id: "B",
        text: "Dat ik veel mensen heb geholpen en ontwikkeld.",
        scores: { relationships: 4, empathy: 4, growth: 4 },
      },
      {
        id: "C",
        text: "Dat ik financieel succesvol ben geworden.",
        scores: { achievement: 4, security: 4, autonomy: 2 },
      },
      {
        id: "D",
        text: "Dat ik altijd integer en eerlijk ben gebleven.",
        scores: { responsibility: 4, selfEsteem: 4, relationships: 3 },
      },
    ],
  },
]

// Import SJT and Cognitive questions and merge them
// SJT Questions (46-55) - Integrated directly
const sjtQuestionsData: Question[] = [
  {
    id: 46,
    text: "Een belangrijke klant belt boos omdat hun bestelling niet op tijd is geleverd voor een cruciale presentatie. Ze dreigen het contract op te zeggen.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Klantcrisis Management",
    situation:
      "Een belangrijke klant belt boos omdat hun bestelling niet op tijd is geleverd voor een cruciale presentatie. Ze dreigen het contract op te zeggen.",
    options: [
      {
        id: "A",
        text: "Ik verontschuldig me uitgebreid en beloof dat dit nooit meer zal gebeuren.",
        effectiveness: 2,
        reasoning: "Toont empathie maar biedt geen concrete oplossing",
        scores: { customerFocus: 3, stressManagement: 2, problemSolving: 1 },
      },
      {
        id: "B",
        text: "Ik neem volledige verantwoordelijkheid, bied een directe oplossing en compensatie aan.",
        effectiveness: 4,
        reasoning: "Proactieve aanpak met concrete actie en herstel",
        scores: { customerFocus: 4, problemSolving: 4, leadership: 4, stressManagement: 4 },
      },
      {
        id: "C",
        text: "Ik leg uit dat de vertraging buiten onze controle lag en verwijs naar de contractvoorwaarden.",
        effectiveness: 1,
        reasoning: "Defensief en niet klantgericht, escaleert waarschijnlijk de situatie",
        scores: { customerFocus: 1, stressManagement: 2, problemSolving: 1 },
      },
      {
        id: "D",
        text: "Ik luister naar hun frustratie, onderzoek de oorzaak en stel een actieplan voor.",
        effectiveness: 4,
        reasoning: "Empathisch, analytisch en oplossingsgericht",
        scores: { customerFocus: 4, problemSolving: 4, stressManagement: 3, decisionMaking: 4 },
      },
    ],
  },
  {
    id: 47,
    text: "Twee teamleden hebben een heftige discussie over de aanpak van een project. De sfeer wordt gespannen en andere collega's voelen zich ongemakkelijk.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Team Conflict",
    situation:
      "Twee teamleden hebben een heftige discussie over de aanpak van een project. De sfeer wordt gespannen en andere collega's voelen zich ongemakkelijk.",
    options: [
      {
        id: "A",
        text: "Ik laat hen uitpraten en hoop dat ze er zelf uitkomen.",
        effectiveness: 1,
        reasoning: "Passieve aanpak die het conflict kan laten escaleren",
        scores: { leadership: 1, teamwork: 2, stressManagement: 2 },
      },
      {
        id: "B",
        text: "Ik grijp direct in en bepaal welke aanpak we gaan volgen.",
        effectiveness: 2,
        reasoning: "Autoritair maar lost de onderliggende spanning niet op",
        scores: { leadership: 3, teamwork: 2, decisionMaking: 3, stressManagement: 3 },
      },
      {
        id: "C",
        text: "Ik organiseer een aparte meeting om beide standpunten te bespreken en tot consensus te komen.",
        effectiveness: 4,
        reasoning: "Constructieve aanpak die alle partijen betrekt",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4, decisionMaking: 4 },
      },
      {
        id: "D",
        text: "Ik spreek beide partijen individueel aan over hun gedrag.",
        effectiveness: 3,
        reasoning: "Goede aanpak maar mist de kans voor teambuilding",
        scores: { leadership: 3, teamwork: 3, stressManagement: 3 },
      },
    ],
  },
  {
    id: 48,
    text: "Je hebt drie belangrijke projecten die allemaal volgende week af moeten zijn, maar je team heeft niet genoeg capaciteit om alles op tijd te voltooien.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Deadline Druk",
    situation:
      "Je hebt drie belangrijke projecten die allemaal volgende week af moeten zijn, maar je team heeft niet genoeg capaciteit om alles op tijd te voltooien.",
    options: [
      {
        id: "A",
        text: "Ik werk zelf extra uren om alles af te krijgen.",
        effectiveness: 2,
        reasoning: "Toont inzet maar is niet duurzaam en lost het structurele probleem niet op",
        scores: { stressManagement: 2, problemSolving: 2, leadership: 2 },
      },
      {
        id: "B",
        text: "Ik prioriteer de projecten en communiceer proactief met stakeholders over aangepaste deadlines.",
        effectiveness: 4,
        reasoning: "Strategische aanpak met heldere communicatie",
        scores: { decisionMaking: 4, problemSolving: 4, leadership: 4, stressManagement: 4 },
      },
      {
        id: "C",
        text: "Ik vraag het management om extra resources of externe hulp.",
        effectiveness: 3,
        reasoning: "Praktische oplossing maar toont minder eigenaarschap",
        scores: { problemSolving: 3, decisionMaking: 3, leadership: 2 },
      },
      {
        id: "D",
        text: "Ik verdeel het werk en vraag iedereen om extra uren te maken.",
        effectiveness: 2,
        reasoning: "Kan werken op korte termijn maar risico op burn-out",
        scores: { leadership: 2, teamwork: 2, stressManagement: 2 },
      },
    ],
  },
  {
    id: 49,
    text: "Je ontdekt dat een collega onjuiste informatie heeft gegeven aan een klant om een deal te sluiten. De klant heeft al getekend.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Ethisch Dilemma",
    situation:
      "Je ontdekt dat een collega onjuiste informatie heeft gegeven aan een klant om een deal te sluiten. De klant heeft al getekend.",
    options: [
      {
        id: "A",
        text: "Ik doe alsof ik niets heb gezien om de collega niet in problemen te brengen.",
        effectiveness: 1,
        reasoning: "Ethisch onjuist en kan leiden tot grotere problemen",
        scores: { decisionMaking: 1, leadership: 1, customerFocus: 1 },
      },
      {
        id: "B",
        text: "Ik spreek de collega aan en geef hem de kans om het zelf recht te zetten.",
        effectiveness: 3,
        reasoning: "Geeft de collega een kans maar risico dat het niet gebeurt",
        scores: { decisionMaking: 3, leadership: 3, teamwork: 4, customerFocus: 3 },
      },
      {
        id: "C",
        text: "Ik rapporteer het direct aan de manager.",
        effectiveness: 3,
        reasoning: "Juiste procedure maar mist de kans voor directe oplossing",
        scores: { decisionMaking: 4, leadership: 2, customerFocus: 3 },
      },
      {
        id: "D",
        text: "Ik zorg ervoor dat de klant de juiste informatie krijgt en bespreek het incident met mijn manager.",
        effectiveness: 4,
        reasoning: "Klantgericht en integer, met juiste escalatie",
        scores: { decisionMaking: 4, leadership: 4, customerFocus: 4, problemSolving: 4 },
      },
    ],
  },
  {
    id: 50,
    text: "Je stelt een nieuwe, efficiëntere werkwijze voor, maar ervaren collega's zijn weerstandig en willen vasthouden aan de huidige methode.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Innovatie vs Traditie",
    situation:
      "Je stelt een nieuwe, efficiëntere werkwijze voor, maar ervaren collega's zijn weerstandig en willen vasthouden aan de huidige methode.",
    options: [
      {
        id: "A",
        text: "Ik geef op en ga verder met de huidige methode om conflicten te vermijden.",
        effectiveness: 1,
        reasoning: "Vermijdt conflict maar mist kansen voor verbetering",
        scores: { leadership: 1, problemSolving: 1, stressManagement: 2 },
      },
      {
        id: "B",
        text: "Ik implementeer de nieuwe methode in mijn eigen werk en laat de resultaten spreken.",
        effectiveness: 3,
        reasoning: "Toont initiatief maar mist teamaanpak",
        scores: { leadership: 3, problemSolving: 3, decisionMaking: 3 },
      },
      {
        id: "C",
        text: "Ik organiseer een workshop om de voordelen te demonstreren en hun zorgen te bespreken.",
        effectiveness: 4,
        reasoning: "Inclusieve aanpak die weerstand kan overwinnen",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4, decisionMaking: 3 },
      },
      {
        id: "D",
        text: "Ik vraag het management om de nieuwe methode verplicht te stellen.",
        effectiveness: 2,
        reasoning: "Kan werken maar creëert mogelijk meer weerstand",
        scores: { leadership: 2, teamwork: 1, decisionMaking: 2 },
      },
    ],
  },
  {
    id: 51,
    text: "Een klant vraagt om een functionaliteit die technisch mogelijk is, maar veel tijd en resources kost die niet in het budget zitten.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Klant Verwachtingen",
    situation:
      "Een klant vraagt om een functionaliteit die technisch mogelijk is, maar veel tijd en resources kost die niet in het budget zitten.",
    options: [
      {
        id: "A",
        text: "Ik zeg direct dat het niet mogelijk is binnen het huidige budget.",
        effectiveness: 2,
        reasoning: "Eerlijk maar mist kansen voor creatieve oplossingen",
        scores: { customerFocus: 2, problemSolving: 2, decisionMaking: 3 },
      },
      {
        id: "B",
        text: "Ik beloof het te onderzoeken en kom later terug met een voorstel.",
        effectiveness: 3,
        reasoning: "Koopt tijd maar kan valse verwachtingen wekken",
        scores: { customerFocus: 3, problemSolving: 3, stressManagement: 2 },
      },
      {
        id: "C",
        text: "Ik leg uit waarom het kostbaar is en bied alternatieve oplossingen aan.",
        effectiveness: 4,
        reasoning: "Transparant en oplossingsgericht",
        scores: { customerFocus: 4, problemSolving: 4, decisionMaking: 4 },
      },
      {
        id: "D",
        text: "Ik vraag wat de onderliggende behoefte is en zoek naar een efficiëntere oplossing.",
        effectiveness: 4,
        reasoning: "Consultative aanpak die tot betere oplossingen kan leiden",
        scores: { customerFocus: 4, problemSolving: 4, decisionMaking: 4 },
      },
    ],
  },
  {
    id: 52,
    text: "Een teamlid presteert onder de maat en dit begint invloed te hebben op de rest van het team en de projectresultaten.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Performance Management",
    situation:
      "Een teamlid presteert onder de maat en dit begint invloed te hebben op de rest van het team en de projectresultaten.",
    options: [
      {
        id: "A",
        text: "Ik neem het extra werk over om de deadlines te halen.",
        effectiveness: 1,
        reasoning: "Korte termijn oplossing die het probleem niet adresseert",
        scores: { leadership: 1, teamwork: 2, problemSolving: 1 },
      },
      {
        id: "B",
        text: "Ik spreek het teamlid aan over de prestaties en bied ondersteuning aan.",
        effectiveness: 4,
        reasoning: "Directe, constructieve aanpak met focus op ontwikkeling",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4, decisionMaking: 4 },
      },
      {
        id: "C",
        text: "Ik rapporteer het probleem aan HR of het management.",
        effectiveness: 2,
        reasoning: "Juiste escalatie maar mist persoonlijke coaching kans",
        scores: { leadership: 2, teamwork: 2, decisionMaking: 3 },
      },
      {
        id: "D",
        text: "Ik herstructureer het team om de zwakke prestaties te compenseren.",
        effectiveness: 3,
        reasoning: "Praktische oplossing maar adresseert niet de root cause",
        scores: { leadership: 3, problemSolving: 3, teamwork: 3 },
      },
    ],
  },
  {
    id: 53,
    text: "Er is een miscommunicatie ontstaan tussen jouw team en een ander team, waardoor een belangrijke deadline in gevaar komt.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Communicatie Crisis",
    situation:
      "Er is een miscommunicatie ontstaan tussen jouw team en een ander team, waardoor een belangrijke deadline in gevaar komt.",
    options: [
      {
        id: "A",
        text: "Ik zoek uit wie de fout heeft gemaakt en zorg dat dit niet meer gebeurt.",
        effectiveness: 2,
        reasoning: "Focus op schuld in plaats van oplossing",
        scores: { problemSolving: 2, teamwork: 1, stressManagement: 2 },
      },
      {
        id: "B",
        text: "Ik organiseer direct een meeting met beide teams om de situatie te herstellen.",
        effectiveness: 4,
        reasoning: "Proactieve aanpak die focus legt op samenwerking",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4, stressManagement: 4 },
      },
      {
        id: "C",
        text: "Ik werk extra hard om de vertraging in te halen zonder anderen te betrekken.",
        effectiveness: 2,
        reasoning: "Toont inzet maar lost communicatieprobleem niet op",
        scores: { stressManagement: 2, teamwork: 1, problemSolving: 2 },
      },
      {
        id: "D",
        text: "Ik stel nieuwe communicatieprotocollen voor om dit in de toekomst te voorkomen.",
        effectiveness: 3,
        reasoning: "Goede preventieve maatregel maar lost huidige crisis niet op",
        scores: { problemSolving: 3, leadership: 3, decisionMaking: 4 },
      },
    ],
  },
  {
    id: 54,
    text: "Twee projecten waar je aan werkt hebben beide dezelfde specialist nodig, maar deze persoon kan niet aan beide projecten tegelijk werken.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Resource Conflict",
    situation:
      "Twee projecten waar je aan werkt hebben beide dezelfde specialist nodig, maar deze persoon kan niet aan beide projecten tegelijk werken.",
    options: [
      {
        id: "A",
        text: "Ik laat de specialist zelf beslissen aan welk project hij wil werken.",
        effectiveness: 1,
        reasoning: "Vermijdt verantwoordelijkheid en kan tot willekeurige keuze leiden",
        scores: { leadership: 1, decisionMaking: 1, problemSolving: 2 },
      },
      {
        id: "B",
        text: "Ik analyseer beide projecten en prioriteer op basis van business impact.",
        effectiveness: 4,
        reasoning: "Strategische aanpak gebaseerd op objectieve criteria",
        scores: { decisionMaking: 4, leadership: 4, problemSolving: 4 },
      },
      {
        id: "C",
        text: "Ik zoek naar externe expertise of alternatieve oplossingen.",
        effectiveness: 3,
        reasoning: "Creatieve aanpak maar mogelijk kostbaar",
        scores: { problemSolving: 4, decisionMaking: 3, leadership: 3 },
      },
      {
        id: "D",
        text: "Ik verdeel de tijd van de specialist tussen beide projecten.",
        effectiveness: 2,
        reasoning: "Compromis maar kan leiden tot inefficiëntie",
        scores: { decisionMaking: 2, problemSolving: 2, teamwork: 3 },
      },
    ],
  },
  {
    id: 55,
    text: "Het bedrijf introduceert een nieuw systeem dat je werkwijze drastisch verandert. Sommige collega's zijn enthousiast, anderen zeer weerstandig.",
    category: "sjt",
    timeLimit: 60,
    scenario: "Change Management",
    situation:
      "Het bedrijf introduceert een nieuw systeem dat je werkwijze drastisch verandert. Sommige collega's zijn enthousiast, anderen zeer weerstandig.",
    options: [
      {
        id: "A",
        text: "Ik focus op mijn eigen aanpassing en laat anderen hun eigen weg vinden.",
        effectiveness: 2,
        reasoning: "Individuele aanpak die teamdynamiek negeert",
        scores: { leadership: 1, teamwork: 1, stressManagement: 3 },
      },
      {
        id: "B",
        text: "Ik word een change champion en help anderen met de overgang.",
        effectiveness: 4,
        reasoning: "Leiderschap tonen en team ondersteunen",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4, stressManagement: 3 },
      },
      {
        id: "C",
        text: "Ik verzamel feedback van het team en deel dit met het management.",
        effectiveness: 3,
        reasoning: "Goede communicatie maar mist directe ondersteuning",
        scores: { teamwork: 4, leadership: 3, decisionMaking: 3 },
      },
      {
        id: "D",
        text: "Ik organiseer informele training sessies voor het team.",
        effectiveness: 4,
        reasoning: "Proactieve ondersteuning die adoptie versnelt",
        scores: { leadership: 4, teamwork: 4, problemSolving: 4 },
      },
    ],
  },
]

// Cognitive Questions (56-65) - Integrated directly
const cognitiveQuestionsData: Question[] = [
  {
    id: 56,
    text: "Een product kost €120. Na een korting van 15% en BTW van 21%, wat is de eindprijs?",
    category: "cognitive",
    type: "numerical",
    timeLimit: 90,
    difficulty: 3,
    correctAnswer: "B",
    options: [
      { id: "A", text: "€108.60", isCorrect: false },
      { id: "B", text: "€123.42", isCorrect: true },
      { id: "C", text: "€118.80", isCorrect: false },
      { id: "D", text: "€125.40", isCorrect: false },
    ],
  },
  {
    id: 57,
    text: "Als de verkoop in Q1 €50.000 was en dit 25% hoger is dan Q4 vorig jaar, wat was de verkoop in Q4?",
    category: "cognitive",
    type: "numerical",
    timeLimit: 90,
    difficulty: 2,
    correctAnswer: "C",
    options: [
      { id: "A", text: "€37.500", isCorrect: false },
      { id: "B", text: "€42.500", isCorrect: false },
      { id: "C", text: "€40.000", isCorrect: true },
      { id: "D", text: "€45.000", isCorrect: false },
    ],
  },
  {
    id: 58,
    text: "Een team van 5 mensen kan een project in 8 dagen afmaken. Hoeveel dagen duurt het met 8 mensen?",
    category: "cognitive",
    type: "numerical",
    timeLimit: 90,
    difficulty: 2,
    correctAnswer: "A",
    options: [
      { id: "A", text: "5 dagen", isCorrect: true },
      { id: "B", text: "6 dagen", isCorrect: false },
      { id: "C", text: "4 dagen", isCorrect: false },
      { id: "D", text: "7 dagen", isCorrect: false },
    ],
  },
  {
    id: 59,
    text: "Welke zin is grammaticaal correct?",
    category: "cognitive",
    type: "verbal",
    timeLimit: 60,
    difficulty: 2,
    correctAnswer: "B",
    options: [
      { id: "A", text: "De resultaten van de assessment is veelbelovend.", isCorrect: false },
      { id: "B", text: "De resultaten van de assessment zijn veelbelovend.", isCorrect: true },
      { id: "C", text: "De resultaten van de assessment zijn veelbelovende.", isCorrect: false },
      { id: "D", text: "De resultaat van de assessment zijn veelbelovend.", isCorrect: false },
    ],
  },
  {
    id: 60,
    text: "Wat is het beste synoniem voor 'innovatief' in een business context?",
    category: "cognitive",
    type: "verbal",
    timeLimit: 60,
    difficulty: 3,
    correctAnswer: "C",
    options: [
      { id: "A", text: "Traditioneel", isCorrect: false },
      { id: "B", text: "Experimenteel", isCorrect: false },
      { id: "C", text: "Vernieuwend", isCorrect: true },
      { id: "D", text: "Risicovol", isCorrect: false },
    ],
  },
  {
    id: 61,
    text: "Welke zin drukt de sterkste overtuiging uit?",
    category: "cognitive",
    type: "verbal",
    timeLimit: 60,
    difficulty: 3,
    correctAnswer: "A",
    options: [
      { id: "A", text: "Dit zal zeker leiden tot succes.", isCorrect: true },
      { id: "B", text: "Dit zou kunnen leiden tot succes.", isCorrect: false },
      { id: "C", text: "Dit leidt mogelijk tot succes.", isCorrect: false },
      { id: "D", text: "Dit lijkt tot succes te leiden.", isCorrect: false },
    ],
  },
  {
    id: 62,
    text: "Als alle verkopers ambitieus zijn, en Jan is een verkoper, dan is Jan:",
    category: "cognitive",
    type: "logical",
    timeLimit: 75,
    difficulty: 2,
    correctAnswer: "A",
    options: [
      { id: "A", text: "Ambitieus", isCorrect: true },
      { id: "B", text: "Mogelijk ambitieus", isCorrect: false },
      { id: "C", text: "Niet ambitieus", isCorrect: false },
      { id: "D", text: "Onbekend of ambitieus", isCorrect: false },
    ],
  },
  {
    id: 63,
    text: "Patroon: 2, 6, 18, 54, ... Wat is het volgende getal?",
    category: "cognitive",
    type: "logical",
    timeLimit: 90,
    difficulty: 3,
    correctAnswer: "C",
    options: [
      { id: "A", text: "108", isCorrect: false },
      { id: "B", text: "144", isCorrect: false },
      { id: "C", text: "162", isCorrect: true },
      { id: "D", text: "180", isCorrect: false },
    ],
  },
  {
    id: 64,
    text: "Als A > B en B > C, en C = D, wat is waar?",
    category: "cognitive",
    type: "logical",
    timeLimit: 75,
    difficulty: 2,
    correctAnswer: "B",
    options: [
      { id: "A", text: "A = D", isCorrect: false },
      { id: "B", text: "A > D", isCorrect: true },
      { id: "C", text: "A < D", isCorrect: false },
      { id: "D", text: "A en D zijn niet vergelijkbaar", isCorrect: false },
    ],
  },
  {
    id: 65,
    text: "Patroon: 1, 4, 9, 16, 25, ... Wat is het volgende getal?",
    category: "cognitive",
    type: "logical",
    timeLimit: 90,
    difficulty: 3,
    correctAnswer: "C",
    options: [
      { id: "A", text: "19", isCorrect: false },
      { id: "B", text: "41", isCorrect: false },
      { id: "C", text: "36", isCorrect: true },
      { id: "D", text: "30", isCorrect: false },
    ],
  },
]

// Combine all questions (45 sales + 10 SJT + 10 cognitive = 65 total)
export const allQuestions: Question[] = [
  ...questions, // 45 sales questions (1-45)
  ...sjtQuestionsData, // 10 SJT questions (46-55)
  ...cognitiveQuestionsData, // 10 cognitive questions (56-65)
]

// SJT and Cognitive scoring functions
export function calculateSJTScores(answers: Record<number, string>) {
  const scores = {
    decisionMaking: 0,
    stressManagement: 0,
    customerFocus: 0,
    problemSolving: 0,
    leadership: 0,
    teamwork: 0,
    overall: 0,
  }

  const counters = {
    decisionMaking: 0,
    stressManagement: 0,
    customerFocus: 0,
    problemSolving: 0,
    leadership: 0,
    teamwork: 0,
  }

  // Process SJT questions (46-55)
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionNum = Number.parseInt(questionId)
    if (questionNum >= 46 && questionNum <= 55) {
      const question = sjtQuestionsData.find((q) => q.id === questionNum)
      const option = question?.options.find((o) => o.id === optionId)

      if (option && option.effectiveness) {
        // Convert effectiveness (1-4) to percentage (25%, 50%, 75%, 100%)
        const effectivenessScore = option.effectiveness * 25

        if (option.scores) {
          Object.entries(option.scores).forEach(([key, value]) => {
            if (value !== undefined && key in scores) {
              scores[key as keyof typeof scores] += effectivenessScore
              counters[key as keyof typeof counters]++
            }
          })
        }
      }
    }
  })

  // Calculate averages
  Object.keys(counters).forEach((key) => {
    const typedKey = key as keyof typeof counters
    if (counters[typedKey] > 0) {
      scores[typedKey] = Math.round(scores[typedKey] / counters[typedKey])
    } else {
      scores[typedKey] = 50 // Default score
    }
  })

  // Calculate overall score
  const allScores = Object.values(scores).filter((_, index) => index < 6) // Exclude 'overall'
  scores.overall = Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)

  return scores
}

export function calculateCognitiveScores(answers: Record<number, string>, timeTaken: Record<number, number>) {
  const scores = {
    numerical: 0,
    verbal: 0,
    logical: 0,
    spatial: 0,
    overall: 0,
    processingSpeed: 0,
    accuracy: 0,
  }

  const counters = {
    numerical: 0,
    verbal: 0,
    logical: 0,
    spatial: 0,
  }

  let totalCorrect = 0
  let totalQuestions = 0
  let totalTime = 0
  let totalTimeLimit = 0

  // Process cognitive questions (56-65)
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionNum = Number.parseInt(questionId)
    if (questionNum >= 56 && questionNum <= 65) {
      const question = cognitiveQuestionsData.find((q) => q.id === questionNum)

      if (question && question.type) {
        totalQuestions++
        const isCorrect = optionId === question.correctAnswer
        if (isCorrect) totalCorrect++

        // Add to category score
        const categoryScore = isCorrect ? 100 : 0
        scores[question.type] += categoryScore
        counters[question.type]++

        // Track timing
        const timeSpent = timeTaken[questionNum] || question.timeLimit || 60
        totalTime += timeSpent
        totalTimeLimit += question.timeLimit || 60
      }
    }
  })

  // Calculate category averages
  Object.keys(counters).forEach((key) => {
    const typedKey = key as keyof typeof counters
    if (counters[typedKey] > 0) {
      scores[typedKey] = Math.round(scores[typedKey] / counters[typedKey])
    } else {
      scores[typedKey] = 0
    }
  })

  // Calculate overall metrics
  scores.accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
  scores.processingSpeed =
    totalTimeLimit > 0 ? Math.round(((totalTimeLimit - totalTime) / totalTimeLimit) * 100 + 50) : 50
  scores.processingSpeed = Math.max(0, Math.min(100, scores.processingSpeed)) // Clamp between 0-100

  // Calculate overall score (weighted average)
  const categoryScores = [scores.numerical, scores.verbal, scores.logical, scores.spatial].filter((s) => s > 0)
  scores.overall =
    categoryScores.length > 0
      ? Math.round(categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length)
      : 0

  return scores
}

// Enhanced scoring function that includes all three types
export function calculateEnhancedScores(
  answers: Record<number, string>,
  timeTaken: Record<number, number>,
): EnhancedAssessmentScores {
  // Calculate traditional sales scores (questions 1-45)
  const traditional = calculateComprehensiveScores(answers)

  // Calculate SJT scores (questions 46-55)
  const sjt = calculateSJTScores(answers)

  // Calculate cognitive scores (questions 56-65)
  const cognitive = calculateCognitiveScores(answers, timeTaken)

  // Calculate combined score (weighted average)
  const combinedScore = Math.round(
    traditional.overallScore * 0.6 + // 60% weight for sales skills
      sjt.overall * 0.25 + // 25% weight for situational judgment
      cognitive.overall * 0.15, // 15% weight for cognitive abilities
  )

  // Calculate overall reliability
  const totalQuestions = allQuestions.length
  const answeredQuestions = Object.keys(answers).length
  const reliability = Math.round((answeredQuestions / totalQuestions) * 100)

  return {
    traditional,
    sjt,
    cognitive,
    combined: combinedScore,
    reliability,
  }
}

// Nieuwe profiel definities gebaseerd op OMG model
export type SalesProfile = {
  name: string
  description: string
  characteristics: string[]
  strengths: string[]
  developmentAreas: string[]
  recruitmentAdvice: string
  idealRole: string
  managementTips: string[]
}

export const salesProfiles: Record<string, SalesProfile> = {
  eliteHunter: {
    name: "Elite Hunter",
    description:
      "Een uitzonderlijke verkoper met sterke Sales DNA en uitstekende hunting vaardigheden. Deze professional heeft de drive, vaardigheden en mentaliteit om consistent nieuwe business te genereren en targets te overtreffen.",
    characteristics: [
      "Zeer hoge Will to Sell en lage Need for Approval",
      "Uitstekende hunting en closing vaardigheden",
      "Sterke motivatie door achievement en recognition",
      "Hoge resilience en assertiveness",
    ],
    strengths: [
      "Genereert consistent nieuwe business",
      "Overtuigt moeilijke prospects",
      "Houdt vol bij tegenslagen",
      "Neemt ownership van resultaten",
      "Werkt goed onder druk",
    ],
    developmentAreas: [
      "Mogelijk minder geduld met langdurige relatieopbouw",
      "Kan baat hebben bij meer empathie in klantinteracties",
      "Balans tussen jagen en farmen",
    ],
    recruitmentAdvice:
      "STERK AANBEVOLEN - Top performer potentieel. Geschikt voor senior sales rollen en nieuwe marktpenetratie.",
    idealRole: "Senior Account Executive, Business Development, New Market Development",
    managementTips: [
      "Geef autonomie en vermijd micromanagement",
      "Stel uitdagende targets met aantrekkelijke beloningen",
      "Bied kansen voor leadership en mentoring",
    ],
  },

  consultativeAdvisor: {
    name: "Consultative Advisor",
    description:
      "Een relatiegerichte verkoper die uitblinkt in consultative selling en langdurige klantrelaties. Deze professional combineert sterke empathie met solide sales vaardigheden.",
    characteristics: [
      "Hoge consultative selling en empathy scores",
      "Sterke focus op relationships en growth",
      "Goede qualifying en communication vaardigheden",
      "Gemiddelde tot hoge Will to Sell",
    ],
    strengths: [
      "Bouwt sterke, vertrouwensvolle klantrelaties",
      "Uitstekend in behoefteanalyse",
      "Hoge klanttevredenheid en retention",
      "Natuurlijke advisor voor klanten",
      "Goed in complex solution selling",
    ],
    developmentAreas: [
      "Kan meer assertief zijn in closing",
      "Sneller handelen bij nieuwe opportunities",
      "Balans tussen relatie en resultaat",
    ],
    recruitmentAdvice: "AANBEVOLEN - Uitstekend voor account management en consultative sales rollen.",
    idealRole: "Account Manager, Solution Consultant, Customer Success Manager",
    managementTips: [
      "Geef tijd voor relatieopbouw",
      "Focus op kwaliteit boven kwantiteit",
      "Bied training in assertiveness en closing",
    ],
  },

  balancedPerformer: {
    name: "Balanced Performer",
    description:
      "Een veelzijdige verkoper met goede scores op meerdere gebieden. Deze professional is flexibel inzetbaar en toont stabiele prestaties zonder uitgesproken zwakke punten.",
    characteristics: [
      "Gemiddeld tot goede scores op alle competenties",
      "Geen uitgesproken zwakke punten",
      "Flexibel en aanpasbaar",
      "Stabiele motivatie en outlook",
    ],
    strengths: [
      "Veelzijdigheid en flexibiliteit",
      "Stabiele, voorspelbare prestaties",
      "Kan in verschillende rollen functioneren",
      "Goede teamspeler",
      "Leert snel nieuwe vaardigheden",
    ],
    developmentAreas: [
      "Ontwikkeling van specialistische sterke punten",
      "Meer uitgesproken profiel creëren",
      "Focus op één of twee kernvaardigheden",
    ],
    recruitmentAdvice: "AANBEVOLEN - Betrouwbare performer, geschikt voor diverse sales rollen.",
    idealRole: "Account Executive, Inside Sales, Sales Support",
    managementTips: [
      "Help bij het identificeren van natuurlijke talenten",
      "Bied gevarieerde ervaringen en training",
      "Ondersteun bij specialisatie keuzes",
    ],
  },

  developmentCandidate: {
    name: "Development Candidate",
    description:
      "Een kandidaat met potentieel die baat heeft bij gerichte ontwikkeling en coaching. Toont motivatie en leervermogen maar heeft nog ontwikkeling nodig in kernvaardigheden.",
    characteristics: [
      "Lagere scores op meerdere sales competenties",
      "Wel motivatie en growth mindset aanwezig",
      "Heeft begeleiding en training nodig",
      "Potentieel voor ontwikkeling",
    ],
    strengths: [
      "Leergierigheid en groeipotentieel",
      "Onbevangen en open voor feedback",
      "Kan snel ontwikkelen met goede begeleiding",
      "Vaak hoge motivatie en commitment",
    ],
    developmentAreas: [
      "Alle kernvaardigheden kunnen versterkt worden",
      "Heeft intensieve begeleiding nodig",
      "Training in basis sales vaardigheden",
      "Opbouw van zelfvertrouwen en assertiveness",
    ],
    recruitmentAdvice: "VOORWAARDELIJK - Alleen aanbevolen met intensief ontwikkelplan en mentoring.",
    idealRole: "Junior Sales, Sales Trainee, Inside Sales met coaching",
    managementTips: [
      "Intensieve begeleiding en mentoring",
      "Duidelijke ontwikkeldoelen stellen",
      "Regelmatige feedback en coaching sessies",
    ],
  },

  relationshipBuilder: {
    name: "Relationship Builder",
    description:
      "Een mensen-gerichte verkoper die uitblinkt in het opbouwen en onderhouden van relaties. Sterke empathie en communicatievaardigheden, maar mogelijk minder assertief in closing.",
    characteristics: [
      "Zeer hoge empathy en relationships scores",
      "Sterke communication vaardigheden",
      "Mogelijk hogere Need for Approval",
      "Focus op langdurige samenwerking",
    ],
    strengths: [
      "Uitstekende klantrelaties en loyalty",
      "Hoge klanttevredenheid en referrals",
      "Natuurlijke netwerker",
      "Goed in account management en upselling",
      "Sterke communicatieve vaardigheden",
    ],
    developmentAreas: [
      "Meer assertiviteit in sales gesprekken",
      "Directere closing technieken",
      "Balans tussen relatie en commerciële doelen",
    ],
    recruitmentAdvice: "AANBEVOLEN - Uitstekend voor account management en klantbehoud rollen.",
    idealRole: "Account Manager, Customer Success, Key Account Management",
    managementTips: [
      "Geef training in assertiveness en closing",
      "Stel duidelijke commerciële doelen",
      "Waarder relatie-opbouw maar meet ook resultaten",
    ],
  },

  analyticalSeller: {
    name: "Analytical Seller",
    description:
      "Een doordachte verkoper die uitblinkt in voorbereiding, analyse en strategisch denken. Sterke qualifying vaardigheden maar mogelijk minder spontaan in interacties.",
    characteristics: [
      "Hoge qualifying en consultative selling scores",
      "Sterke voorbereiding en research vaardigheden",
      "Analytische benadering van sales",
      "Mogelijk lagere spontaniteit en assertiveness",
    ],
    strengths: [
      "Uitstekende voorbereiding en research",
      "Strategisch denken en planning",
      "Goede qualifying van prospects",
      "Doordachte sales aanpak",
      "Sterke presentatie vaardigheden",
    ],
    developmentAreas: [
      "Meer spontaniteit in klantinteracties",
      "Snellere besluitvorming",
      "Meer vertrouwen op intuïtie",
    ],
    recruitmentAdvice: "AANBEVOLEN - Geschikt voor complexe B2B sales en solution selling.",
    idealRole: "Solution Consultant, Technical Sales, Enterprise Sales",
    managementTips: [
      "Geef tijd voor voorbereiding",
      "Waarder analytische aanpak",
      "Help bij ontwikkeling van spontaniteit",
    ],
  },

  resilientCloser: {
    name: "Resilient Closer",
    description:
      "Een veerkrachtige verkoper die uitblinkt in het omgaan met afwijzing en het afsluiten van deals. Sterke persistence en closing vaardigheden.",
    characteristics: [
      "Hoge resilience en persistence scores",
      "Sterke closing vaardigheden",
      "Lage Need for Approval",
      "Goede omgang met druk en stress",
    ],
    strengths: [
      "Uitstekend in deal closing",
      "Houdt vol bij moeilijke prospects",
      "Goed onder druk",
      "Leert van afwijzingen",
      "Sterke focus op resultaten",
    ],
    developmentAreas: [
      "Meer geduld in relatieopbouw",
      "Empathie in klantinteracties",
      "Langetermijn account development",
    ],
    recruitmentAdvice: "AANBEVOLEN - Uitstekend voor transactionele sales en closing rollen.",
    idealRole: "Closer, Transactional Sales, Short Cycle Sales",
    managementTips: [
      "Geef uitdagende closing targets",
      "Bied training in empathie en relatieopbouw",
      "Waarder persistence en resultaten",
    ],
  },
}

// Fix de scoring logica - maak het veel realistischer voor random antwoorden
export function calculateComprehensiveScores(answers: Record<number, string>): ComprehensiveScores {
  const scores: ComprehensiveScores = {
    salesDNA: {
      willToSell: 0,
      needForApproval: 0,
      nonSupportiveBuyingCycle: 0,
    },
    competencies: {
      hunting: 0,
      consultativeSelling: 0,
      qualifying: 0,
      closingSkills: 0,
      accountManagement: 0,
      presentationSkills: 0,
    },
    attributes: {
      desire: 0,
      commitment: 0,
      responsibility: 0,
      outlook: 0,
      motivation: 0,
      selfEsteem: 0,
    },
    behavioral: {
      resilience: 0,
      adaptability: 0,
      empathy: 0,
      assertiveness: 0,
      persistence: 0,
      communication: 0,
    },
    motivational: {
      achievement: 0,
      recognition: 0,
      autonomy: 0,
      growth: 0,
      security: 0,
      relationships: 0,
    },
    overallScore: 0,
    reliability: 0,
  }

  // Counters voor elke categorie om gemiddelden te berekenen
  const counters = {
    salesDNA: { willToSell: 0, needForApproval: 0, nonSupportiveBuyingCycle: 0 },
    competencies: {
      hunting: 0,
      consultativeSelling: 0,
      qualifying: 0,
      closingSkills: 0,
      accountManagement: 0,
      presentationSkills: 0,
    },
    attributes: { desire: 0, commitment: 0, responsibility: 0, outlook: 0, motivation: 0, selfEsteem: 0 },
    behavioral: { resilience: 0, adaptability: 0, empathy: 0, assertiveness: 0, persistence: 0, communication: 0 },
    motivational: { achievement: 0, recognition: 0, autonomy: 0, growth: 0, security: 0, relationships: 0 },
  }

  let totalQuestions = 0
  let answeredQuestions = 0

  // Calculate scores for each answered question (only sales questions 1-45)
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionNum = Number.parseInt(questionId)
    // Only process sales questions (1-45)
    if (questionNum >= 1 && questionNum <= 45) {
      const question = questions.find((q) => q.id === questionNum)

      if (question) {
        totalQuestions++
        const option = question.options.find((o) => o.id === optionId)

        if (option && option.scores) {
          answeredQuestions++

          // Add scores from this option - gebruik een meer conservatieve scoring
          Object.entries(option.scores).forEach(([key, value]) => {
            if (value !== undefined && value > 0) {
              // Gebruik een meer realistische scoring:
              // 1 = 10%, 2 = 30%, 3 = 60%, 4 = 90%
              // Dit zorgt ervoor dat random antwoorden gemiddeld 47.5% scoren
              let scoreValue: number
              if (option.reverseScored) {
                scoreValue = 5 - value
              } else {
                scoreValue = value
              }

              // Converteer naar percentage met meer realistische verdeling
              let percentage: number
              switch (scoreValue) {
                case 1:
                  percentage = 10
                  break
                case 2:
                  percentage = 30
                  break
                case 3:
                  percentage = 60
                  break
                case 4:
                  percentage = 90
                  break
                default:
                  percentage = 25 // fallback
              }

              // Sales DNA
              if (key in scores.salesDNA) {
                scores.salesDNA[key as keyof SalesDNA] += percentage
                counters.salesDNA[key as keyof SalesDNA]++
              }
              // Competencies
              else if (key in scores.competencies) {
                scores.competencies[key as keyof SalesCompetencies] += percentage
                counters.competencies[key as keyof SalesCompetencies]++
              }
              // Attributes
              else if (key in scores.attributes) {
                scores.attributes[key as keyof SalesAttributes] += percentage
                counters.attributes[key as keyof SalesAttributes]++
              }
              // Behavioral
              else if (key in scores.behavioral) {
                scores.behavioral[key as keyof BehavioralTraits] += percentage
                counters.behavioral[key as keyof BehavioralTraits]++
              }
              // Motivational
              else if (key in scores.motivational) {
                scores.motivational[key as keyof MotivationalDrivers] += percentage
                counters.motivational[key as keyof MotivationalDrivers]++
              }
            }
          })
        }
      }
    }
  })

  // Calculate averages for each category
  const calculateAverages = (category: any, counter: any) => {
    Object.keys(category).forEach((key) => {
      if (counter[key] > 0) {
        category[key] = Math.round(category[key] / counter[key])
      } else {
        category[key] = 25 // Default naar 25% als er geen data is
      }
      // Ensure scores are within 0-100 range
      category[key] = Math.max(0, Math.min(100, category[key]))
    })
  }

  calculateAverages(scores.salesDNA, counters.salesDNA)
  calculateAverages(scores.competencies, counters.competencies)
  calculateAverages(scores.attributes, counters.attributes)
  calculateAverages(scores.behavioral, counters.behavioral)
  calculateAverages(scores.motivational, counters.motivational)

  // Calculate overall score
  const allScores = [
    ...Object.values(scores.salesDNA),
    ...Object.values(scores.competencies),
    ...Object.values(scores.attributes),
    ...Object.values(scores.behavioral),
    ...Object.values(scores.motivational),
  ]

  scores.overallScore = Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length)

  // Calculate reliability (only for sales questions)
  scores.reliability = Math.round((answeredQuestions / 45) * 100) // 45 sales questions

  return scores
}

export function determineAdvancedProfile(scores: ComprehensiveScores): {
  profile: SalesProfile
  confidence: number
  details: ComprehensiveScores
  insights: string[]
} {
  const { salesDNA, competencies, attributes, behavioral, motivational } = scores

  let selectedProfile: SalesProfile
  let confidence: number
  const insights: string[] = []

  // Elite Hunter criteria
  if (
    salesDNA.willToSell >= 75 &&
    salesDNA.needForApproval <= 30 &&
    competencies.hunting >= 70 &&
    competencies.closingSkills >= 70
  ) {
    selectedProfile = salesProfiles.eliteHunter
    confidence = 90
    insights.push("Sterke Sales DNA met uitstekende hunting vaardigheden")
  }
  // Consultative Advisor criteria
  else if (competencies.consultativeSelling >= 75 && behavioral.empathy >= 70 && competencies.qualifying >= 65) {
    selectedProfile = salesProfiles.consultativeAdvisor
    confidence = 85
    insights.push("Uitstekende consultative selling en empathie")
  }
  // Relationship Builder criteria
  else if (behavioral.empathy >= 80 && motivational.relationships >= 75 && behavioral.communication >= 70) {
    selectedProfile = salesProfiles.relationshipBuilder
    confidence = 85
    insights.push("Zeer sterke focus op relaties en communicatie")
  }
  // Analytical Seller criteria
  else if (competencies.qualifying >= 75 && competencies.presentationSkills >= 70 && attributes.responsibility >= 70) {
    selectedProfile = salesProfiles.analyticalSeller
    confidence = 80
    insights.push("Analytische en doordachte sales aanpak")
  }
  // Resilient Closer criteria
  else if (behavioral.resilience >= 75 && competencies.closingSkills >= 70 && behavioral.persistence >= 70) {
    selectedProfile = salesProfiles.resilientCloser
    confidence = 85
    insights.push("Uitstekende veerkracht en closing vaardigheden")
  }
  // Balanced Performer criteria
  else if (scores.overallScore >= 60 && scores.overallScore < 75) {
    selectedProfile = salesProfiles.balancedPerformer
    confidence = 75
    insights.push("Goede balans tussen verschillende sales vaardigheden")
  }
  // Development Candidate
  else {
    selectedProfile = salesProfiles.developmentCandidate
    confidence = 70
    insights.push("Heeft ontwikkeling nodig maar toont potentieel")
  }

  // Add specific insights based on scores
  if (salesDNA.willToSell >= 80) {
    insights.push("Zeer hoge bereidheid om te verkopen")
  }
  if (salesDNA.needForApproval >= 70) {
    insights.push("Mogelijk te veel behoefte aan goedkeuring - kan sales effectiviteit beperken")
  }
  if (behavioral.resilience >= 80) {
    insights.push("Uitstekende veerkracht bij tegenslagen")
  }
  if (motivational.achievement >= 80) {
    insights.push("Sterk gedreven door prestaties en resultaten")
  }

  return { profile: selectedProfile, confidence, details: scores, insights }
}

// Utility functions
export const getQuestions = () => {
  return [...allQuestions]
    .sort(() => Math.random() - 0.5)
    .map((question) => ({
      ...question,
      options: [...question.options].sort(() => Math.random() - 0.5),
    }))
}

export const detectSocialDesirabilityBias = (answers: Record<number, string>, timeTaken: Record<number, number>) => {
  let suspiciouslyFastAnswers = 0
  let socialDesirabilityFlags = 0

  Object.entries(answers).forEach(([questionId, optionId]) => {
    const questionNum = Number.parseInt(questionId)
    const question = allQuestions.find((q) => q.id === questionNum)
    const option = question?.options.find((o) => o.id === optionId)

    if (option?.socialDesirabilityFlag) {
      socialDesirabilityFlags++
    }

    const time = timeTaken[questionNum]
    if (time && time < 8) {
      // Less than 8 seconds is suspicious for these complex questions
      suspiciouslyFastAnswers++
    }
  })

  const reliability = Math.max(0, 1 - suspiciouslyFastAnswers * 0.1 - socialDesirabilityFlags * 0.15)

  return {
    biased: suspiciouslyFastAnswers > 8 || socialDesirabilityFlags > 6,
    score: socialDesirabilityFlags,
    suspiciouslyFastAnswers,
    socialDesirabilityFlags,
    reliability,
  }
}

// Export legacy functions for compatibility
export const calculateScores = (answers: Record<number, string>) => {
  const comprehensive = calculateComprehensiveScores(answers)
  return {
    proactiviteit: comprehensive.competencies.hunting,
    veerkracht: comprehensive.behavioral.resilience,
    klantgerichtheid: comprehensive.behavioral.empathy,
    resultaatgerichtheid: comprehensive.motivational.achievement,
    overtuigingskracht: comprehensive.competencies.closingSkills,
    aanpassingsvermogen: comprehensive.behavioral.adaptability,
  }
}

export const determineProfile = (scores: any) => {
  const comprehensive = calculateComprehensiveScores({}) // This is a simplified version
  const advanced = determineAdvancedProfile(comprehensive)
  return {
    profile: advanced.profile,
    confidence: advanced.confidence,
    details: scores,
  }
}

export const getTraitDescription = (trait: string): string => {
  const descriptions: Record<string, string> = {
    proactiviteit: "Het vermogen om initiatief te nemen en vooruitlopend te handelen",
    veerkracht: "Het vermogen om om te gaan met tegenslagen en door te zetten",
    klantgerichtheid: "Focus op klantbehoeften en het opbouwen van relaties",
    resultaatgerichtheid: "Gedrevenheid om doelen te behalen en resultaten te leveren",
    overtuigingskracht: "Het vermogen om anderen te beïnvloeden en te overtuigen",
    aanpassingsvermogen: "Flexibiliteit en het vermogen om zich aan te passen aan situaties",
  }
  return descriptions[trait] || trait
}
