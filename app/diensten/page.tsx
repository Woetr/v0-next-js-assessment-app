import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DienstenPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Onze Diensten</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Bij BouwerPower bieden we verschillende diensten aan om u en uw organisatie te helpen groeien
        </p>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Persoonlijkheids- & Verkoopvaardigheden Assessment</CardTitle>
              <CardDescription>Inzicht in jezelf en je verkooptalent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Onze uitgebreide assessment geeft inzicht in je persoonlijkheidskenmerken en verkoopvaardigheden. Ideaal
                voor persoonlijke ontwikkeling of als onderdeel van een selectieprocedure.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>45 zorgvuldig geselecteerde vragen</li>
                <li>Gebaseerd op het Big Five persoonlijkheidsmodel</li>
                <li>Specifieke focus op verkoopaptitude</li>
                <li>Gedetailleerd rapport met ontwikkeltips</li>
              </ul>
              <div className="pt-4">
                <Link href="/assessment">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Assessment</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Coaching & Begeleiding</CardTitle>
              <CardDescription>Persoonlijke groei en ontwikkeling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Onze ervaren coaches helpen je om je doelen te bereiken, obstakels te overwinnen en je volledige
                potentieel te benutten. We bieden zowel individuele coaching als teamcoaching.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Persoonlijke ontwikkeltrajecten</li>
                <li>Leiderschapscoaching</li>
                <li>Verkoopcoaching</li>
                <li>Teamontwikkeling</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Meer Informatie</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Training & Workshops</CardTitle>
              <CardDescription>Ontwikkeling van specifieke vaardigheden</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Onze trainingen en workshops zijn gericht op het ontwikkelen van specifieke vaardigheden en
                competenties. We bieden zowel open inschrijvingen als maatwerk programma's voor organisaties.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verkooptrainingen</li>
                <li>Communicatievaardigheden</li>
                <li>Presentatietechnieken</li>
                <li>Timemanagement</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Meer Informatie</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Advies & Consultancy</CardTitle>
              <CardDescription>Strategische ondersteuning voor organisaties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We ondersteunen organisaties bij het ontwikkelen en implementeren van strategieën op het gebied van
                talent management, leiderschapsontwikkeling en organisatieverandering.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Talent management</li>
                <li>Organisatieontwikkeling</li>
                <li>Verandermanagement</li>
                <li>Strategische personeelsplanning</li>
              </ul>
              <div className="pt-4">
                <Link href="/contact">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Neem Contact Op</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
