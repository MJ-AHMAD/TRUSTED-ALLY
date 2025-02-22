"use client"

import { motion } from "framer-motion"
import { TrendingUp, Award, Lightbulb, Leaf, Users, Heart, Cpu, Handshake, BarChart } from "lucide-react"

const investmentOpportunities = [
  {
    title: "Educational Programs",
    icon: TrendingUp,
    items: [
      "Support the development and expansion of our comprehensive educational initiatives",
      "Invest in innovative e-learning platforms and technology-driven educational tools",
    ],
  },
  {
    title: "Community Empowerment",
    icon: Users,
    items: [
      "Fund skill development programs, vocational training, and entrepreneurship initiatives",
      "Empower women and youth through targeted leadership and development programs",
    ],
  },
  {
    title: "Health and Well-being",
    icon: Heart,
    items: [
      "Back our health education, mental health support, and nutritional programs",
      "Contribute to initiatives that promote overall well-being and healthy lifestyles",
    ],
  },
  {
    title: "Environmental Sustainability",
    icon: Leaf,
    items: [
      "Invest in green technology projects and environmental education programs",
      "Support community garden projects and other eco-friendly initiatives",
    ],
  },
  {
    title: "Technology and Innovation",
    icon: Cpu,
    items: [
      "Help bridge the digital divide by funding tech education and digital literacy programs",
      "Invest in innovation labs and technology hubs that foster creativity and problem-solving",
    ],
  },
]

const investorBenefits = [
  {
    title: "Social Impact",
    icon: Handshake,
    items: [
      "Your investment will directly contribute to the betterment of society",
      "Be part of a movement that empowers individuals and transforms communities",
    ],
  },
  {
    title: "Brand Association",
    icon: Award,
    items: [
      "Align your brand with a reputable and impactful organization",
      "Enhance your corporate social responsibility (CSR) profile through meaningful partnerships",
    ],
  },
  {
    title: "Financial Returns",
    icon: BarChart,
    items: [
      "Opportunities for financial returns through strategic investments and partnerships",
      "Transparent reporting and accountability for all financial transactions",
    ],
  },
  {
    title: "Networking and Collaboration",
    icon: Handshake,
    items: [
      "Connect with other like-minded investors and stakeholders",
      "Collaborate on projects and initiatives that align with your values and goals",
    ],
  },
]

export default function InvestorPage() {
  return (
    <div className="bg-background py-24 sm:py-32" id="investor-page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-8 text-center">Investor Information</h2>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Join us in our mission to transform education and empower communities worldwide.
        </p>
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Why Invest in TRUSTED-ALLY?</h3>
            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  title: "Transformative Mission",
                  icon: Lightbulb,
                  description:
                    "We are dedicated to providing accessible and quality education to all. Our initiatives empower communities and promote sustainable development.",
                },
                {
                  title: "Proven Track Record",
                  icon: Award,
                  description:
                    "We have successfully implemented numerous educational and community programs. Our projects have positively impacted the lives of thousands of individuals.",
                },
                {
                  title: "Innovative Approach",
                  icon: Cpu,
                  description:
                    "We utilize innovative teaching methods and cutting-edge technology to enhance learning. Our programs are designed to be inclusive and adaptable to the needs of diverse communities.",
                },
                {
                  title: "Sustainable Impact",
                  icon: Leaf,
                  description:
                    "We focus on creating long-term, sustainable solutions that drive real change. Our commitment to environmental sustainability ensures that our programs contribute to a healthier planet.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <item.icon className="h-6 w-6 text-primary mr-2" />
                    <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Investment Opportunities</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {investmentOpportunities.map((opportunity, index) => (
                <motion.div
                  key={opportunity.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <opportunity.icon className="h-6 w-6 text-primary mr-2" />
                    <h4 className="text-lg font-semibold text-foreground">{opportunity.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {opportunity.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Benefits for Investors</h3>
            <div className="grid gap-8 md:grid-cols-2">
              {investorBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary mr-2" />
                    <h4 className="text-lg font-semibold text-foreground">{benefit.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-muted-foreground flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Make an Impact?</h3>
            <p className="text-muted-foreground mb-4">
              Join us in our mission to transform lives through education and community empowerment. Your investment can
              make a real difference.
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Contact Us to Invest
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

