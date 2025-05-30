"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { getQuestions, type Question } from "@/data/questions"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AssessmentPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeTaken, setTimeTaken] = useState<Record<number, number>>({})
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isUserInfoComplete, setIsUserInfoComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [deviceFingerprint, setDeviceFingerprint] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  // Genereer device fingerprint voor detectie van meerdere pogingen
  useEffect(() => {
    const generateFingerprint = () => {
      try {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.textBaseline = "top"
          ctx.font = "14px Arial"
          ctx.fillText("Device fingerprint", 2, 2)
        }

        const fingerprint = btoa(
          JSON.stringify({
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvas: canvas.toDataURL(),
          }),
        )

        setDeviceFingerprint(fingerprint)
      } catch (error) {
        console.error("Error generating fingerprint:", error)
        // Fallback to a simple fingerprint if canvas fails
        setDeviceFingerprint(btoa(navigator.userAgent + navigator.language))
      }
    }

    generateFingerprint()
  }, [])

  useEffect(() => {
    if (hasStarted) {
      try {
        // Laad vragen (gerandomiseerd)
        const loadedQuestions = getQuestions()
        setQuestions(loadedQuestions)
        setQuestionStartTime(Date.now())
      } catch (error) {
        console.error("Error loading questions:", error)
        setError(
          "Er is een fout opgetreden bij het laden van de vragen. Vernieuw de pagina om het opnieuw te proberen.",
        )
      }
    }
  }, [hasStarted])

  // Timer voor huidige vraag
  useEffect(() => {
    if (questions.length > 0 && hasStarted) {
      const currentQuestion = questions[currentQuestionIndex]
      if (currentQuestion?.timeLimit) {
        setTimeLeft(currentQuestion.timeLimit)

        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              // Tijd is op, ga automatisch naar volgende vraag
              handleNext(true)
              return 0
            }
            return prev - 1
          })
        }, 1000)

        return () => clearInterval(timer)
      }
    }
  }, [currentQuestionIndex, questions, hasStarted])

  const handleAnswerSelect = (optionId: string) => {
    const currentTime = Date.now()
    const timeSpent = Math.round((currentTime - questionStartTime) / 1000)

    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: optionId,
    })

    setTimeTaken({
      ...timeTaken,
      [questions[currentQuestionIndex].id]: timeSpent,
    })
  }

  const handleNext = useCallback(
    (autoAdvance = false) => {
      const currentQuestion = questions[currentQuestionIndex]

      // Als tijd is afgelopen en geen antwoord is gegeven, sla vraag over
      if (autoAdvance && !answers[currentQuestion.id]) {
        setTimeTaken({
          ...timeTaken,
          [currentQuestion.id]: currentQuestion.timeLimit || 30,
        })
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionStartTime(Date.now())
      } else {
        handleSubmit()
      }
    },
    [currentQuestionIndex, questions, answers, timeTaken],
  )

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setQuestionStartTime(Date.now())
    }
  }

  const handleSubmit = async () => {
    console.log("=== FRONTEND SUBMISSION START ===")
    console.log("Submission data:", {
      name,
      email,
      answersCount: Object.keys(answers).length,
      timeTakenCount: Object.keys(timeTaken).length,
      deviceFingerprintLength: deviceFingerprint.length,
    })

    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Making API call to submit assessment...")

      // Voeg een timeout toe aan de fetch
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log("Request timeout triggered")
        controller.abort()
      }, 60000) // 60 seconden timeout

      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          answers,
          timeTaken,
          deviceFingerprint,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("API response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      })

      const data = await response.json()
      console.log("API response data:", data)

      if (response.ok) {
        // Log email status for debugging
        console.log("Email status:", {
          emailSent: data.emailSent,
          warning: data.warning,
          environment: data.environment,
        })

        // Als er een waarschuwing is, toon deze maar ga toch door
        if (data.warning) {
          console.warn("Warning from server:", data.warning)
        }

        console.log("Assessment submission successful, redirecting to thank you page")
        // Ga naar de bedankt-pagina
        router.push("/assessment/bedankt")
      } else {
        console.error("Failed to submit assessment:", data.error)
        setError(`Er was een fout bij het versturen van je assessment: ${data.error || "Onbekende fout"}`)
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)

      // Controleer op specifieke fouten
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted due to timeout")
          setError(
            "Het versturen van de assessment duurde te lang. We hebben je antwoorden opgeslagen en zullen contact met je opnemen.",
          )

          // Ga toch naar de bedankt-pagina na een timeout
          setTimeout(() => {
            router.push("/assessment/bedankt")
          }, 3000)
          return
        }
      }

      // Probeer de foutmelding uit de response te halen
      let errorMessage = "Er was een fout bij het versturen van je assessment. Probeer het opnieuw."

      if (error instanceof Error) {
        try {
          // Als het een fetch error is, probeer de response te parsen
          const errorText = error.message
          if (errorText.includes("Failed to fetch")) {
            errorMessage = "Netwerkfout - controleer je internetverbinding en probeer het opnieuw."
          } else {
            errorMessage = errorText
          }
        } catch (parseError) {
          console.error("Error parsing error message:", parseError)
        }
      }

      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
      console.log("=== FRONTEND SUBMISSION END ===")
    }
  }

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && name) {
      setIsUserInfoComplete(true)
    }
  }

  const handleStartAssessment = () => {
    setHasStarted(true)
  }

  const progress = questions.length > 0 ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) : 0

  if (!isUserInfoComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Voordat We Beginnen</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Je Naam</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Voer je volledige naam in"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Je Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Voer je emailadres in"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#2d5c88] hover:bg-[#2d5c88]/90">
                  Doorgaan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!hasStarted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Belangrijke Instructies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Let op:</strong> Deze assessment is ontworpen om je vaardigheden en kwaliteiten te evalueren
                  voor BouwerPower.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h3 className="font-semibold">Instructies:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Beantwoord alle vragen eerlijk - dit geeft ons het beste beeld van je kwaliteiten</li>
                  <li>Elke vraag heeft een tijdslimiet</li>
                  <li>Je kunt niet teruggaan naar vorige vragen</li>
                  <li>De vragen worden in willekeurige volgorde gepresenteerd</li>
                  <li>Het duurt ongeveer 15-20 minuten om te voltooien</li>
                  <li>De resultaten worden naar ons recruitmentteam gestuurd</li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  Door te beginnen ga je akkoord dat je de assessment eerlijk invult en dat de resultaten worden
                  gebruikt door BouwerPower.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartAssessment} className="w-full bg-[#2d5c88] hover:bg-[#2d5c88]/90">
                Start Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Assessment vragen laden...</p>
        {error && (
          <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {error && (
          <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Vraag {currentQuestionIndex + 1} van {questions.length}
            </span>
            <div className="flex items-center space-x-4">
              {currentQuestion.timeLimit && (
                <span className={`text-sm font-medium ${timeLeft <= 10 ? "text-red-600" : "text-gray-600"}`}>
                  Tijd: {timeLeft}s
                </span>
              )}
              <span className="text-sm font-medium">{progress}% Voltooid</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          {currentQuestion.timeLimit && (
            <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="h-1 mt-1" />
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={handleAnswerSelect}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleAnswerSelect(option.id)}
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="opacity-50 cursor-not-allowed"
            >
              Vorige (Niet beschikbaar)
            </Button>
            <Button
              onClick={() => handleNext()}
              disabled={!answers[currentQuestion.id] || isSubmitting}
              className="bg-[#2d5c88] hover:bg-[#2d5c88]/90"
            >
              {currentQuestionIndex < questions.length - 1 ? "Volgende" : "Versturen"}
              {isSubmitting && currentQuestionIndex === questions.length - 1 && "..."}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
