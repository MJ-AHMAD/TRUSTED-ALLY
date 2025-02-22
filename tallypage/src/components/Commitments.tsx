"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  Lightbulb,
  Globe,
  Leaf,
  HandshakeIcon,
  Heart,
  TrendingUp,
  Eye,
  DollarSign,
  Compass,
} from "lucide-react"

const commitments = [
  {
    title: "Commitment to Education",
    icon: BookOpen,
    items: ["Provide accessible and quality education to all", "Continuously develop and improve educational programs"],
  },
  {
    title: "Commitment to Community Empowerment",
    icon: Users,
    items: ["Empower local communities through initiatives", "Foster a sense of belonging and active participation"],
  },
  {
    title: "Commitment to Innovation",
    icon: Lightbulb,
    items: ["Implement innovative teaching methods and technologies", "Encourage creativity and critical thinking"],
  },
  {
    title: "Commitment to Inclusivity and Diversity",
    icon: Globe,
    items: ["Promote inclusivity and celebrate diversity", "Ensure every individual feels valued and respected"],
  },
  {
    title: "Commitment to Sustainability",
    icon: Leaf,
    items: [
      "Integrate environmental awareness and sustainable practices",
      "Educate on importance of eco-friendly practices",
    ],
  },
  {
    title: "Commitment to Collaboration",
    icon: HandshakeIcon,
    items: ["Collaborate with various organizations and stakeholders", "Build strong partnerships to enhance impact"],
  },
  {
    title: "Commitment to Health and Well-being",
    icon: Heart,
    items: ["Prioritize mental and physical health", "Provide resources for overall well-being"],
  },
  {
    title: "Commitment to Continuous Improvement",
    icon: TrendingUp,
    items: ["Regularly assess and improve programs", "Stay updated with latest trends in education"],
  },
  {
    title: "Commitment to Transparency and Accountability",
    icon: Eye,
    items: ["Maintain transparency in all activities", "Be accountable to community and stakeholders"],
  },
  {
    title: "Commitment to Financial Accessibility",
    icon: DollarSign,
    items: ["Provide financial aid and scholarships", "Ensure financial barriers don't hinder education"],
  },
  {
    title: "Commitment to Future Generations",
    icon: Compass,
    items: ["Prepare next generation of leaders", "Invest in programs with long-term positive impact"],
  },
]

export default function Commitments() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="commitments">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary-light rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-secondary-light rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Our Commitments</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, we are dedicated to making a positive impact through our unwavering commitments to
            education, community empowerment, and sustainable development.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map((commitment, index) => (
            <motion.div
              key={commitment.title}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <commitment.icon className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">{commitment.title}</h3>
              </div>
              <ul className="space-y-2">
                {commitment.items.map((item, itemIndex) => (
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
    </div>
  )
}

