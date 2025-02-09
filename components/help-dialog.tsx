import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>About Luck Test</DialogTitle>
          <DialogDescription>Learn how to test your luck with our coin flip game</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold mb-2">What is Luck Tester?</h3>
            <p className="text-sm text-muted-foreground">
              This luck tester is creatively created by Flip A Coin Simulator to let you easily test your luck anytime
              anywhere in your daily life. Throughout the good luck testing, you are able to see how lucky you are on
              spot with just a maximum of 5 trials of coin flipping. The more you can get the same flips, the higher
              your luck score will be.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">How to Carry Out a Good Luck Testing?</h3>
            <p className="text-sm text-muted-foreground">
              Luck Test game consists of a maximum of 5 trials. The test will instantly come to an end when you flip a
              different side of the coin. If you flip the coin on the same side for all five trials, you have reached
              the pinnacle of luck.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Game Rules</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>You have a maximum of 5 trials</li>
              <li>The game ends if you get a different side than your first flip</li>
              <li>Your score is the number of consecutive same-side flips</li>
              <li>Getting all 5 flips the same is a perfect score!</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">Customization</h3>
            <p className="text-sm text-muted-foreground">You can customize your experience by changing:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Heads and tails colors</li>
              <li>Background color</li>
              <li>Sound effects</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

