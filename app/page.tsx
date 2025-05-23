import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Bouwerpower Recruitment Assessment
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Toon je vaardigheden en kwaliteiten aan ons recruitmentteam met deze assessment.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Over Deze Assessment</CardTitle>
            <CardDescription>Wat je kunt verwachten bij het afleggen van deze test</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>45 meerkeuzevragen om je vaardigheden en kwaliteiten te evalueren</li>
              <li>Ongeveer 15-20 minuten om te voltooien</li>
              <li>Je resultaten worden naar ons recruitmentteam gestuurd voor evaluatie</li>
              <li>Eerlijke antwoorden geven de meest nauwkeurige weergave van je kwaliteiten</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/assessment" className="w-full">
              <Button className="w-full bg-[#2d5c88] hover:bg-[#2d5c88]/90">Start Assessment</Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Evaluatie van Vaardigheden</h3>
            <p className="mt-2 text-gray-600">
              Deze assessment helpt ons om je vaardigheden en kwaliteiten objectief te evalueren.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Professionele Omgeving</h3>
            <p className="mt-2 text-gray-600">
              Bij Bouwerpower werken we in een dynamische en professionele omgeving met uitdagende projecten.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Jouw Kwaliteiten</h3>
            <p className="mt-2 text-gray-600">
              We zijn op zoek naar kandidaten die hun sterke punten kunnen inzetten in een teamomgeving.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
