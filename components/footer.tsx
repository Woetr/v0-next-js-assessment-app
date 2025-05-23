import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BouwerPower</h3>
            <p className="text-gray-600">
              BouwerPower verbindt bedrijven met werknemers. Onze focus ligt op marketing, sales, finance, office & management en technische functies.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 mt-2">Email: email@bouwerpower.nl</p>
            <p className="text-gray-600">Tel: +31 (0)6 1946 4757</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} BouwerPower. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
