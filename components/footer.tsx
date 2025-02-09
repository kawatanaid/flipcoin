import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-purple-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400">
                  Latest Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2 hover:text-purple-400">
                <Facebook className="h-5 w-5" />
                Facebook
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-purple-400">
                <Instagram className="h-5 w-5" />
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-purple-400">
                <Twitter className="h-5 w-5" />X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

