import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Bouwerpower Recruitment Logo"
              width={200}
              height={50}
              className="h-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-[#2d5c88]">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-[#2d5c88]">
              Over Ons
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-[#2d5c88]">
              Contact
            </Link>
          </nav>
          <div>
            <Link href="/assessment">
              <Button variant="outline" className="border-[#2d5c88] text-[#2d5c88] hover:bg-[#2d5c88]/10">
                Start Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
