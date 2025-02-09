"use client"

import { Progress } from "@/components/ui/progress"

interface StatsProps {
  title: string
  totalFlips: number
  headsCount: number
  tailsCount: number
}

export function Stats({ title, totalFlips, headsCount, tailsCount }: StatsProps) {
  const headsPercentage = totalFlips > 0 ? (headsCount / totalFlips) * 100 : 50

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Total Flips: {totalFlips}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Heads: {headsCount} ({headsPercentage.toFixed(1)}%)
            </span>
            <span>
              Tails: {tailsCount} ({(100 - headsPercentage).toFixed(1)}%)
            </span>
          </div>
          <Progress value={headsPercentage} />
        </div>
      </div>
    </div>
  )
}

