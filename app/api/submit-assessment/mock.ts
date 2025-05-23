// Deze functie kan worden gebruikt in de preview-omgeving als de echte API niet beschikbaar is
export async function mockSubmitAssessment(data: any) {
  console.log("Mock assessment submission:", data)
  return { success: true }
}
