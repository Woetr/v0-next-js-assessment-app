export type AssessmentData = {
  name: string
  email: string
  timestamp: string
  answers: Record<number, string>
  timeTaken?: Record<number, number>
  deviceFingerprint?: string
}

export type SJTScores = {
  decisionMaking: number
  stressManagement: number
  customerFocus: number
  problemSolving: number
  leadership: number
  teamwork: number
  overall: number
}

export type CognitiveScores = {
  numerical: number
  verbal: number
  logical: number
  spatial: number
  overall: number
  processingSpeed: number
  accuracy: number
}

export type EnhancedAssessmentScores = {
  traditional: any // existing comprehensive scores
  cognitive: CognitiveScores
  sjt: SJTScores
  combined: number
  reliability: number
}
