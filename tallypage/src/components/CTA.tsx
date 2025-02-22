import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <div className="bg-primary text-primary-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">Ready to make a difference?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join TRUSTED-ALLY today and be part of our mission to transform education and empower communities worldwide.
        </p>
        <Button size="lg" variant="secondary">
          Get Started Now
        </Button>
      </div>
    </div>
  )
}

