import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h1>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 mb-6">
              Have questions or suggestions? We'd love to hear from you! Reach out to us using any of the methods below.
            </p>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold mb-2">Email</h2>
                <p className="text-gray-600">support@flipsimu.com</p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Social Media</h2>
                <p className="text-gray-600">Follow us on social media for updates and fun content!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

