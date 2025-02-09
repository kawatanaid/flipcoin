"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DiceSettingsProps {
  diceColor: string
  setDiceColor: (color: string) => void
  dotColor: string
  setDotColor: (color: string) => void
  displayMode: "dots" | "numbers" | "text" | "images"
  setDisplayMode: (mode: "dots" | "numbers" | "text" | "images") => void
  faceTexts: string[]
  setFaceTexts: (texts: string[]) => void
}

export function DiceSettings({
  diceColor,
  setDiceColor,
  dotColor,
  setDotColor,
  displayMode,
  setDisplayMode,
  faceTexts,
  setFaceTexts,
}: DiceSettingsProps) {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="colors">Colors</TabsTrigger>
      </TabsList>
      <TabsContent value="content" className="space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-3">Display Style</h4>
            <RadioGroup
              value={displayMode}
              onValueChange={(value) => setDisplayMode(value as "dots" | "numbers" | "text" | "images")}
              className="grid gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dots" id="dots" />
                <Label htmlFor="dots">Dots</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numbers" id="numbers" />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text">Texts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="images" id="images" />
                <Label htmlFor="images">Images</Label>
              </div>
            </RadioGroup>
          </div>

          {displayMode === "text" && (
            <div className="grid gap-4">
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <div key={num} className="grid gap-2">
                  <Label htmlFor={`face${num}`}>Face {num}</Label>
                  <Input
                    id={`face${num}`}
                    value={faceTexts[index]}
                    onChange={(e) => {
                      const newTexts = [...faceTexts]
                      newTexts[index] = e.target.value
                      setFaceTexts(newTexts)
                    }}
                    placeholder={`Text for face ${num}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="colors" className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="diceColor">Dice Color</Label>
            <Input type="color" id="diceColor" value={diceColor} onChange={(e) => setDiceColor(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dotColor">Dot/Text Color</Label>
            <Input type="color" id="dotColor" value={dotColor} onChange={(e) => setDotColor(e.target.value)} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

