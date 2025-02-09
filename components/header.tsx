import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShareMenu } from "./share-menu"
import { ToolsMenu } from "./tools-menu"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/contact">Contact Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/news">News</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Flip A Coin
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ShareMenu />
        <ToolsMenu />
      </div>
    </header>
  )
}

