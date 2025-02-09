import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flip A Coin Simulator - Online Heads or Tails",
  description:
    "Flip A Coin Simulator is your fast and reliable online coin flipper that delivers true, random 50/50 results. Make quick decision or just having fun with unbiased heads or tails outcome every time.",
  metadataBase: new URL("https://flipacoinsimu.com"),
  openGraph: {
    title: "Flip A Coin Simulator - Online Heads or Tails",
    description: "Toss a Coin for Heads or Tails Online",
    url: "https://flipacoinsimu.com",
    siteName: "Flip A Coin Simulator",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

