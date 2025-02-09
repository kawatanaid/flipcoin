"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"

export default function IntuitionTest() {
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const controls = useAnimation()

  const flipCoin = async () => {
    if (isFlipping || !selectedSide) return

    setIsFlipping(true)
    const newResult = Math.random() > 0.5 ? "heads" : "tails"

    await controls.start({
      rotateY: [0, 1800],
      transition: { duration: 1.5, ease: "easeInOut" },
    })

    setResult(newResult)
    setIsFlipping(false)
    setAttempts((prev) => prev + 1)

    if (newResult === selectedSide) {
      setScore((prev) => prev + 1)
    }

    setSelectedSide(null)
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && selectedSide) {
        event.preventDefault()
        flipCoin()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedSide]) // Removed flipCoin from dependencies

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">INTUITION TEST</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex mb-4">
              <button
                className={`flex-1 py-4 text-center text-lg font-bold transition-colors ${
                  selectedSide === "heads"
                    ? "bg-purple-400 text-white"
                    : "bg-purple-100 text-purple-900 hover:bg-purple-200"
                }`}
                onClick={() => setSelectedSide("heads")}
                disabled={isFlipping}
              >
                HEADS
              </button>
              <button
                className={`flex-1 py-4 text-center text-lg font-bold transition-colors ${
                  selectedSide === "tails" ? "bg-pink-400 text-white" : "bg-pink-100 text-pink-900 hover:bg-pink-200"
                }`}
                onClick={() => setSelectedSide("tails")}
                disabled={isFlipping}
              >
                TAILS
              </button>
            </div>

            <div className="flex justify-between items-center mb-8 text-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">⭐</span>
                <span>{score}</span>
              </div>
              <div className="text-gray-600">
                Pick One <span className="cursor-default">👆</span>
              </div>
              <div>({attempts}/10)</div>
            </div>

            <div className="flex justify-center mb-8">
              <motion.div
                className="w-64 h-64 rounded-full bg-purple-600 flex items-center justify-center"
                animate={controls}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-white text-5xl font-bold">{result || "HEADS"}</div>
              </motion.div>
            </div>

            <div className="text-center text-sm text-gray-600 mb-4">(Press Button or Click Coin / Spacebar)</div>

            <Button
              onClick={flipCoin}
              disabled={isFlipping || !selectedSide}
              className="w-full py-6 text-xl bg-gray-800 hover:bg-gray-700"
            >
              FLIP IT
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="prose max-w-none">
              <p>
                Test your intuition by predicting the outcome of each coin flip. Select either HEADS or TAILS before
                flipping the coin. You have 10 attempts to see how many correct predictions you can make. The more
                correct predictions, the higher your intuition score!
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

