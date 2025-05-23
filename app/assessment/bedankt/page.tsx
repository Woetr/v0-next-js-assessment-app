import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BedanktPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Bedankt voor het voltooien van de assessment!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Je assessment is succesvol verstuurd naar BouwerPower. We waarderen de tijd en moeite die je hebt gestoken
              in het voltooien van deze evaluatie.
            </p>
            <p>
              Als je vragen hebt over de assessment, neem dan gerust contact met ons op via de contactgegevens op onze
              website.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/">
              <Button className="bg-[#2d5c88] hover:bg-[#2d5c88]/90">Terug naar Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
