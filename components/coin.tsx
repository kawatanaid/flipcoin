"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Settings2, Share2, Facebook, Twitter, Instagram } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CoinProps {
  onFlip: (result: "heads" | "tails") => void
  onRemove?: () => void
  canRemove?: boolean
}

export function Coin({ onFlip, onRemove, canRemove = false }: CoinProps) {
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<"heads" | "tails" | null>(null)
  const [coinColor, setCoinColor] = useState("#9333EA")
  const [headsText, setHeadsText] = useState("HEADS")
  const [tailsText, setTailsText] = useState("TAILS")
  const controls = useAnimation()

  const flipCoin = useCallback(() => {
    if (isFlipping) return

    setIsFlipping(true)
    setResult(null)
    const newResult = Math.random() > 0.5 ? "heads" : "tails"

    controls
      .start({
        rotateY: [0, 1800],
        transition: { duration: 1.5, ease: "easeInOut" },
      })
      .then(() => {
        setResult(newResult)
        setIsFlipping(false)
        onFlip(newResult)
      })
  }, [isFlipping, controls, onFlip])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault()
        flipCoin()
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [flipCoin])

  const generateShareableImage = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 600
    canvas.height = 400
    const ctx = canvas.getContext("2d")

    if (ctx) {
      // Draw background
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, 600, 400)

      // Draw coin
      ctx.beginPath()
      ctx.arc(300, 200, 150, 0, 2 * Math.PI)
      ctx.fillStyle = coinColor
      ctx.fill()

      // Draw text
      ctx.fillStyle = "white"
      ctx.font = "bold 48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(result === "heads" ? headsText : tailsText, 300, 200)

      // Draw website name
      ctx.fillStyle = "#4b5563"
      ctx.font = "24px Arial"
      ctx.fillText("Flip A Coin Simulator", 300, 380)
    }

    return canvas.toDataURL("image/png")
  }

  const shareResult = (platform: string) => {
    const imageUrl = generateShareableImage()
    const text = `I just flipped a coin on Flip Simu and got ${result?.toUpperCase()}! 🎉 Try your luck now!`
    const url = "https://flipacoinsimu.com" // Replace with your actual website URL
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/dialog/share?app_id=YOUR_FB_APP_ID&href=${encodeURIComponent(url)}&picture=${encodeURIComponent(imageUrl)}&quote=${encodeURIComponent(text)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`
        break
      case "tiktok":
      case "instagram":
        // For platforms without direct sharing, we'll copy the text and image to clipboard
        navigator.clipboard.writeText(text + " " + url)
        // You would typically upload the image to a server and get a URL, but for this example:
        alert("Text copied to clipboard. Save and upload the image to share on " + platform)
        const link = document.createElement("a")
        link.download = "flip-result.png"
        link.href = imageUrl
        link.click()
        return
    }

    window.open(shareUrl, "_blank")
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs mx-auto">
      {canRemove && (
        <button
          onClick={onRemove}
          className="self-end mb-2 w-8 h-8 bg-red-500 text-white rounded-full text-xl font-bold"
          aria-label="Remove coin"
        >
          ×
        </button>
      )}
      <motion.div
        className="relative w-64 h-64 cursor-pointer mb-8"
        onClick={flipCoin}
        animate={controls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className={`absolute inset-0 rounded-full shadow-lg flex items-center justify-center ${isFlipping ? "pointer-events-none" : ""}`}
          style={{
            background: `linear-gradient(to bottom right, ${coinColor}, ${coinColor}dd)`,
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(to bottom right, ${coinColor}dd, ${coinColor}aa)` }}
          >
            <span className="text-5xl font-bold text-white">{result === "heads" ? headsText : tailsText}</span>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-4">
        <Button
          onClick={flipCoin}
          disabled={isFlipping}
          className="bg-gray-800 text-white px-8 py-4 text-lg font-bold rounded-md hover:bg-gray-700 transition-colors"
        >
          FLIP IT
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="w-12 h-12">
              <Settings2 className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div>
                <label htmlFor="coinColor" className="text-sm font-medium">
                  Coin Color
                </label>
                <Input id="coinColor" type="color" value={coinColor} onChange={(e) => setCoinColor(e.target.value)} />
              </div>
              <div>
                <label htmlFor="headsText" className="text-sm font-medium">
                  Heads Text
                </label>
                <Input id="headsText" value={headsText} onChange={(e) => setHeadsText(e.target.value)} />
              </div>
              <div>
                <label htmlFor="tailsText" className="text-sm font-medium">
                  Tails Text
                </label>
                <Input id="tailsText" value={tailsText} onChange={(e) => setTailsText(e.target.value)} />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {result && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4 py-2 h-12">
                <Share2 className="h-5 w-5 mr-2" />
                Share Results
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => shareResult("facebook")}>
                <Facebook className="mr-2 h-4 w-4" />
                <span>Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareResult("twitter")}>
                <Twitter className="mr-2 h-4 w-4" />
                <span>X (Twitter)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareResult("whatsapp")}>
                <span className="mr-2">📱</span>
                <span>WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareResult("tiktok")}>
                <span className="mr-2">🎵</span>
                <span>TikTok</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => shareResult("instagram")}>
                <Instagram className="mr-2 h-4 w-4" />
                <span>Instagram</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}

