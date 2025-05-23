import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Over Bouwer Power</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Wie Wij Zijn</CardTitle>
            <CardDescription>Een persoonlijke introductie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="rounded-full overflow-hidden w-48 h-48 bg-gray-200 flex items-center justify-center">
                  <Image src="/logo.png" alt="Hans-Eric Bouwer" width={150} height={150} className="object-contain" />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg font-medium text-[#2d5c88] mb-2">
                  "Mijn naam is Hans-Eric Bouwer, oprichter van BouwerPower Recruitment."
                </p>
                <p>
                  Door mijn jarenlange ervaring in de Solarbranche heb ik mijn technische kennis enorm kunnen vergroten.
                  Vanuit de PV branche kreeg ik steeds meer vragen voor het bemiddelen van monteurs, verkopers en PV
                  designers.
                </p>
              </div>
            </div>
            <p>
              Naast het invullen van technische functies kreeg ik ook opdrachten voor werving en selectie van kantoor en
              management functies. Hieruit is BouwerPower Recruitment ontstaan.
            </p>
            <p>
              Inmiddels ben ik actief in verschillende branches in de BeNeLux en help ik bedrijven bij het vinden van de
              juiste kandidaten voor hun vacatures.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Onze Expertise</CardTitle>
            <CardDescription>Waar we in uitblinken</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Bij BouwerPower Recruitment combineren we technische kennis met een scherp oog voor talent. Onze
              specialisatie ligt in het werven en selecteren van professionals in de volgende sectoren:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Solarbranche:</strong> Monteurs, verkopers, PV designers en projectmanagers
              </li>
              <li>
                <strong>Technische functies:</strong> Installateurs, engineers en technisch specialisten
              </li>
              <li>
                <strong>Kantoor en management:</strong> Administratieve functies, teamleiders en managers
              </li>
              <li>
                <strong>Sales en marketing:</strong> Accountmanagers, marketingspecialisten en salesmanagers
              </li>
            </ul>
            <p>
              Onze persoonlijke aanpak en diepgaande kennis van de markt stellen ons in staat om de perfecte match te
              maken tussen bedrijven en kandidaten.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Onze Werkwijze</CardTitle>
            <CardDescription>Hoe wij te werk gaan</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Bij BouwerPower Recruitment geloven we in een persoonlijke en transparante aanpak. We nemen de tijd om
              zowel de bedrijven als de kandidaten goed te leren kennen, zodat we de beste matches kunnen maken.
            </p>
            <p className="mt-4">
              Onze assessment tool is een belangrijk onderdeel van ons selectieproces. Hiermee kunnen we de vaardigheden
              en kwaliteiten van kandidaten objectief evalueren en zorgen we ervoor dat ze niet alleen qua ervaring,
              maar ook qua persoonlijkheid en competenties bij de functie en het bedrijf passen.
            </p>
            <p className="mt-4">
              We zijn trots op onze resultaten en de langdurige relaties die we hebben opgebouwd met onze klanten in de
              BeNeLux. Door onze persoonlijke benadering en focus op kwaliteit, zijn we uitgegroeid tot een betrouwbare
              partner in recruitment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
