"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Coin } from "@/components/coin"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function Home() {
  const [coins, setCoins] = useState([{ id: 1 }])
  const [globalStats, setGlobalStats] = useState({ total: 1000000, heads: 500234, tails: 499766 })
  const [localStats, setLocalStats] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("coinStats")
      return saved ? JSON.parse(saved) : { total: 0, heads: 0, tails: 0 }
    }
    return { total: 0, heads: 0, tails: 0 }
  })

  useEffect(() => {
    localStorage.setItem("coinStats", JSON.stringify(localStats))
  }, [localStats])

  const handleFlip = (result: "heads" | "tails") => {
    setLocalStats((prev) => ({
      total: prev.total + 1,
      heads: prev.heads + (result === "heads" ? 1 : 0),
      tails: prev.tails + (result === "tails" ? 1 : 0),
    }))
  }

  const addCoin = () => {
    setCoins((prev) => [...prev, { id: Date.now() }])
  }

  const removeCoin = (id: number) => {
    setCoins((prev) => prev.filter((coin) => coin.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">FLIP A COIN SIMULATOR</h2>
          <p className="text-gray-600">Toss a Coin for Heads or Tails Online</p>
        </div>

        <div className="flex flex-row flex-wrap justify-center items-start gap-8 mb-8 w-full">
          {coins.map((coin, index) => (
            <div key={coin.id} className="flex-shrink-0 w-full sm:w-auto">
              <Coin
                onFlip={handleFlip}
                onRemove={coins.length > 1 ? () => removeCoin(coin.id) : undefined}
                canRemove={coins.length > 1}
              />
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Button onClick={addCoin} variant="outline" className="gap-2 text-lg px-6 py-3">
            <PlusCircle className="h-5 w-5" />
            Add Another Coin
          </Button>
        </div>

        <div className="space-y-6 mb-12 w-full max-w-2xl">
          <Stats
            title="Global Statistics"
            totalFlips={globalStats.total}
            headsCount={globalStats.heads}
            tailsCount={globalStats.tails}
          />
          <Stats
            title="Your Statistics"
            totalFlips={localStats.total}
            headsCount={localStats.heads}
            tailsCount={localStats.tails}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-12 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">About Coin Flipping</h2>
          <div className="prose max-w-none">
            <p>
              Coin flipping, also known as coin tossing, is a simple way to make binary decisions. It has been used
              throughout history as a fair way to make choices, settle disputes, or simply test one's luck. Our
              simulator provides a virtual alternative to physical coin flipping, ensuring true randomness and keeping
              track of your statistics.
            </p>
            <h3 className="text-lg font-semibold mt-4 mb-2">How to Use</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click the coin or "FLIP IT" button to flip</li>
              <li>Customize coin appearance using the settings button</li>
              <li>Add multiple coins to flip simultaneously</li>
              <li>Track your statistics over time</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

