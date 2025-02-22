import { CheckCircle } from "lucide-react"

export default function Features() {
  const features = [
    "Comprehensive educational programs",
    "Community empowerment initiatives",
    "Innovative learning methods",
    "Sustainable development focus",
    "Global partnerships",
    "Cutting-edge technology integration",
  ]

  return (
    <div className="bg-background py-24 sm:py-32" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-12 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mr-4 mt-1" />
              <p className="text-lg text-muted-foreground">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

