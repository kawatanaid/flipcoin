"use client"
import { Share2, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ShareMenu() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://flipacoinsimu.com"

  const shareVia = (platform: string) => {
    const text = "Check out this awesome coin flip simulator!"
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`,
    }
    window.open(urls[platform], "_blank")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => shareVia("facebook")}>
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareVia("twitter")}>
          <Twitter className="mr-2 h-4 w-4" />X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareVia("whatsapp")}>
          <span className="mr-2">📱</span>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareVia("email")}>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

