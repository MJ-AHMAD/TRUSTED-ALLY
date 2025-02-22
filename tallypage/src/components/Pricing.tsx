import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Pro",
      price: "$19.99",
      features: ["All Basic features", "Feature 4", "Feature 5", "Feature 6"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["All Pro features", "Feature 7", "Feature 8", "Feature 9", "Custom support"],
    },
  ]

  return (
    <div className="bg-background py-24 sm:py-32" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-12 text-center">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-primary mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

