import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function News() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest Updates</h1>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">New Features Released!</h2>
              <p className="text-gray-600 mb-4">
                We're excited to announce new features including the Intuition Test and Luck Test!
              </p>
              <div className="text-sm text-gray-500">February 4, 2024</div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-2">Website Launch</h2>
              <p className="text-gray-600 mb-4">
                Welcome to FlipSimu! We're thrilled to bring you the best coin flipping experience on the web.
              </p>
              <div className="text-sm text-gray-500">February 1, 2024</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

