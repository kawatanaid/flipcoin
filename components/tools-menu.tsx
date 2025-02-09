"use client"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function ToolsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LayoutGrid className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/">Coin Flipper</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/intuition-test">Intuition Test</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/luck-test">Luck Test</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dice-roller">Dice Roller</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

