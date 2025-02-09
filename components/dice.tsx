"use client"

import { motion, useAnimation } from "framer-motion"
import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DiceSettings } from "./dice-settings"
import { useState, useRef } from "react"

interface DiceProps {
  onRoll: (result: number) => void
  onRemove?: () => void
  canRemove?: boolean
}

export function Dice({ onRoll, onRemove, canRemove = false }: DiceProps) {
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState(6)
  const controls = useAnimation()
  const diceRef = useRef<HTMLDivElement>(null)

  // Customization states
  const [diceColor, setDiceColor] = useState("#9333EA")
  const [dotColor, setDotColor] = useState("#EC4899")
  const [displayMode, setDisplayMode] = useState<"dots" | "numbers" | "text" | "images">("dots")
  const [faceTexts, setFaceTexts] = useState(["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"])

  // Define the rotation angles for each face
  const faceRotations = {
    1: { x: 0, y: 0, z: 0 }, // Front face
    2: { x: 0, y: -90, z: 0 }, // Right face
    3: { x: -90, y: 0, z: 0 }, // Top face
    4: { x: 90, y: 0, z: 0 }, // Bottom face
    5: { x: 0, y: 90, z: 0 }, // Left face
    6: { x: 180, y: 0, z: 0 }, // Back face
  }

  const rollDice = async () => {
    if (isRolling) return

    setIsRolling(true)
    const newResult = Math.floor(Math.random() * 6) + 1

    // Calculate random rotations for the animation
    const spins = 2 // Number of complete rotations
    const finalRotation = faceRotations[newResult as keyof typeof faceRotations]

    await controls.start({
      rotateX: [0, 360 * spins + finalRotation.x],
      rotateY: [0, 360 * spins + finalRotation.y],
      rotateZ: [0, finalRotation.z],
      transition: {
        duration: 2,
        ease: [0.32, 0.72, 0.35, 1.0], // Custom ease for realistic deceleration
      },
    })

    setResult(newResult)
    setIsRolling(false)
    onRoll(newResult)
  }

  const renderFace = (num: number, rotation: { x: number; y: number; z: number }) => {
    const content = () => {
      switch (displayMode) {
        case "dots":
          return (
            <div className="grid grid-cols-3 gap-2 w-full h-full p-4">
              {Array.from({ length: 9 }).map((_, i) => {
                const showDot = getDotVisibility(num, i)
                return showDot ? (
                  <div key={i} className="rounded-full" style={{ backgroundColor: dotColor }} />
                ) : (
                  <div key={i} />
                )
              })}
            </div>
          )
        case "numbers":
          return (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-4xl font-bold" style={{ color: dotColor }}>
                {num}
              </span>
            </div>
          )
        case "text":
          return (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-2xl font-bold text-center" style={{ color: dotColor }}>
                {faceTexts[num - 1]}
              </span>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div
        className="absolute w-full h-full backface-hidden"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) translateZ(32px)`,
          backgroundColor: "white",
          border: `2px solid ${diceColor}`,
          borderRadius: "10px",
        }}
      >
        {content()}
      </div>
    )
  }

  const getDotVisibility = (num: number, index: number) => {
    const patterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    }
    return patterns[num as keyof typeof patterns].includes(index)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs mx-auto">
      {canRemove && (
        <button
          onClick={onRemove}
          className="self-end mb-2 w-8 h-8 bg-red-500 text-white rounded-full text-xl font-bold"
          aria-label="Remove dice"
        >
          ×
        </button>
      )}
      <div className="relative w-64 h-64 perspective-1000">
        <motion.div
          ref={diceRef}
          className="relative w-full h-full cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          onClick={rollDice}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {Object.entries(faceRotations).map(([num, rotation]) => renderFace(Number.parseInt(num), rotation))}
        </motion.div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={rollDice}
          disabled={isRolling}
          className="bg-gray-800 text-white px-8 py-4 text-lg font-bold rounded-md hover:bg-gray-700 transition-colors"
        >
          ROLL IT
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Settings2 className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <DiceSettings
              diceColor={diceColor}
              setDiceColor={setDiceColor}
              dotColor={dotColor}
              setDotColor={setDotColor}
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
              faceTexts={faceTexts}
              setFaceTexts={setFaceTexts}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

