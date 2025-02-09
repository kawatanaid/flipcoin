"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Dice } from "@/components/dice"

export default function DiceRoller() {
  const [dice, setDice] = useState([{ id: 1 }])
  const [results, setResults] = useState<{ [key: number]: number }>({})

  const handleRoll = (id: number, result: number) => {
    setResults((prev) => ({ ...prev, [id]: result }))
  }

  const addDice = () => {
    setDice((prev) => [...prev, { id: Date.now() }])
  }

  const removeDice = (id: number) => {
    setDice((prev) => prev.filter((die) => die.id !== id))
    setResults((prev) => {
      const newResults = { ...prev }
      delete newResults[id]
      return newResults
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">DICE ROLLER</h1>
            <p className="text-gray-600 mt-2">Roll a die with online virtual dice</p>
          </div>

          <div className="flex flex-row flex-wrap justify-center items-start gap-8 mb-8">
            {dice.map((die) => (
              <div key={die.id} className="flex-shrink-0 w-full sm:w-auto">
                <Dice
                  onRoll={(result) => handleRoll(die.id, result)}
                  onRemove={dice.length > 1 ? () => removeDice(die.id) : undefined}
                  canRemove={dice.length > 1}
                />
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <Button onClick={addDice} variant="outline" className="gap-2 text-lg px-6 py-3">
              <PlusCircle className="h-5 w-5" />
              Add Another Dice
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">About Dice Rolling</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                Rolling dice has been a fundamental part of games and decision-making for thousands of years. Our
                virtual dice roller provides a convenient and fair way to roll dice anytime, anywhere. Each roll is
                completely random, simulating the real-world probability of rolling a six-sided die.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">How to Use</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Click the dice or "ROLL IT" button to roll</li>
                <li>Press the spacebar for quick rolls</li>
                <li>Customize dice appearance using the settings button</li>
                <li>Add multiple dice for complex rolls</li>
                <li>Perfect for board games, decision making, or just for fun!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

