"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { RefreshCw, Settings2 } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { HelpDialog } from "@/components/help-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function LuckTest() {
  const [score, setScore] = useState(0)
  const [trials, setTrials] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [results, setResults] = useState<("heads" | "tails")[]>([])
  const [gameOver, setGameOver] = useState(false)
  const controls = useAnimation()
  const [showResult, setShowResult] = useState(false)

  // Customization states
  const [headsColor, setHeadsColor] = useState("#9333EA")
  const [tailsColor, setTailsColor] = useState("#EC4899")
  const [backgroundColor, setBackgroundColor] = useState("#f9fafb")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundError, setSoundError] = useState(false) // Added soundError state

  // Audio refs
  const flipSound = useRef<HTMLAudioElement | null>(null)
  const successSound = useRef<HTMLAudioElement | null>(null)
  const gameOverSound = useRef<HTMLAudioElement | null>(null)

  const resetGame = () => {
    setScore(0)
    setTrials(0)
    setResults([])
    setGameOver(false)
    setShowResult(false) // Add this line
  }

  const playSound = (sound: HTMLAudioElement | null) => {
    if (soundEnabled && sound && sound.readyState >= 2) {
      sound.currentTime = 0
      sound.play().catch((error) => {
        console.error("Error playing sound:", error)
        setSoundError(true)
        setTimeout(() => setSoundError(false), 3000) // Hide error after 3 seconds
      })
    }
  }

  const flipCoin = async () => {
    if (isFlipping || gameOver) return

    setIsFlipping(true)
    const newResult = Math.random() > 0.5 ? "heads" : "tails"
    playSound(flipSound.current)

    await controls.start({
      rotateY: [0, 1800],
      transition: { duration: 1.5, ease: "easeInOut" },
    })

    setResults((prev) => [...prev, newResult])
    setTrials((prev) => prev + 1)
    setIsFlipping(false)

    // Check if the new result breaks the streak
    if (trials > 0 && newResult !== results[0]) {
      setGameOver(true)
      setScore(trials)
      playSound(gameOverSound.current)
      setShowResult(true)
    } else if (trials === 4 && newResult === results[0]) {
      setGameOver(true)
      setScore(5)
      playSound(successSound.current)
      setShowResult(true)
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space" && !gameOver) {
        event.preventDefault()
        flipCoin()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameOver, flipCoin]) // Added flipCoin to dependencies

  useEffect(() => {
    flipSound.current = new Audio("/flip-sound.mp3")
    successSound.current = new Audio("/success-sound.mp3")
    gameOverSound.current = new Audio("/game-over-sound.mp3")
  }, [])

  return (
    <div className="min-h-screen flex flex-col transition-colors" style={{ backgroundColor }}>
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-3xl font-bold text-gray-800">LUCK TEST</h1>
              <Button variant="ghost" size="icon" onClick={resetGame} className="rounded-full">
                <RefreshCw className="h-5 w-5" />
              </Button>
              <HelpDialog />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings2 className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Customization</h4>
                    <div className="space-y-2">
                      <Label htmlFor="headsColor">Heads Color</Label>
                      <Input
                        type="color"
                        id="headsColor"
                        value={headsColor}
                        onChange={(e) => setHeadsColor(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tailsColor">Tails Color</Label>
                      <Input
                        type="color"
                        id="tailsColor"
                        value={tailsColor}
                        onChange={(e) => setTailsColor(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bgColor">Background Color</Label>
                      <Input
                        type="color"
                        id="bgColor"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound">Sound Effects</Label>
                      <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {!gameOver && trials === 0 && (
              <div className="mt-4 text-xl font-semibold text-gray-600">Your Luck Score Today</div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-16 h-16 rounded transition-colors ${
                    i < trials ? (results[0] === "heads" ? "bg-opacity-90" : "bg-opacity-90") : "bg-gray-200"
                  }`}
                  style={{
                    backgroundColor: i < trials ? (results[0] === "heads" ? headsColor : tailsColor) : undefined,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between items-center mb-8 text-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">🍀</span>
                <span>{score}</span>
              </div>
              <div>({trials}/5)</div>
            </div>

            <div className="flex justify-center mb-8">
              <motion.div
                className="w-64 h-64 rounded-full flex items-center justify-center transition-colors"
                animate={controls}
                style={{
                  backgroundColor: results[results.length - 1] === "tails" ? tailsColor : headsColor,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="text-white text-5xl font-bold">
                  {results[results.length - 1]?.toUpperCase() || "HEADS"}
                </div>
              </motion.div>
            </div>

            <div className="text-center text-sm text-gray-600 mb-4">(Press Button or Click Coin / Spacebar)</div>

            <Button
              onClick={flipCoin}
              disabled={isFlipping || gameOver}
              className="w-full py-6 text-xl bg-gray-800 hover:bg-gray-700"
            >
              FLIP IT
            </Button>

            {gameOver && (
              <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Game Over</DialogTitle>
                    <DialogDescription>
                      <div className="mt-6 text-center">
                        <div className="text-2xl font-bold mb-2">Your Luck Score: {score}/5</div>
                        <div className="text-gray-600">
                          {score === 5
                            ? "Perfect! You're incredibly lucky! 🌟"
                            : score >= 3
                              ? "Great luck! Keep it up! ✨"
                              : "Try again for better luck! 🍀"}
                        </div>
                        <Button onClick={resetGame} className="mt-4" variant="outline">
                          Try Again
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">About Luck Test</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Welcome to the Luck Test! This exciting game is designed to measure your luck through a series of coin
                flips. Whether you're a beginner or a seasoned player, this guide will help you understand how it works.
              </p>
              <h3 className="text-xl font-semibold">What is the Luck Test?</h3>
              <p>
                The Luck Test is a simple yet engaging way to test your fortune. It uses coin flips to determine how
                "lucky" you are at a given moment. The game consists of up to 5 coin flips, with the goal of getting the
                same result (heads or tails) consecutively.
              </p>
              <h3 className="text-xl font-semibold">How it Works</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Click the "FLIP IT" button or press the spacebar to start.</li>
                <li>The coin will flip and land on either heads or tails.</li>
                <li>Your goal is to get the same result on consecutive flips.</li>
                <li>The game ends when you get a different result or complete all 5 flips successfully.</li>
                <li>Your luck score is determined by how many consecutive same-side flips you achieve.</li>
              </ol>
              <h3 className="text-xl font-semibold">Scoring</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>1/5: Better luck next time!</li>
                <li>2/5: Not bad, but room for improvement.</li>
                <li>3/5: You're getting lucky!</li>
                <li>4/5: Great luck!</li>
                <li>5/5: Perfect score! You're incredibly lucky!</li>
              </ul>
              <p>
                Remember, this is just for fun! Your "luck" can change from moment to moment, so don't take the results
                too seriously. Enjoy the game and may fortune be in your favor!
              </p>
            </div>
          </div>
        </div>
        {soundError && ( // Added sound error notification
          <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            Unable to play sound. Please check your browser settings.
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

