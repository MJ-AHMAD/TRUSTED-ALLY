"use client"

import { motion } from "framer-motion"
import {
  Users,
  Rocket,
  Globe,
  Scale,
  Leaf,
  Award,
  Heart,
  Megaphone,
  HandshakeIcon,
  BookOpen,
  Target,
} from "lucide-react"

const opportunities = [
  {
    title: "Transforming Education",
    icon: BookOpen,
    description: "Leveraging innovative technologies and teaching methods to revolutionize education.",
  },
  {
    title: "Empowering Communities",
    icon: Users,
    description: "Creating opportunities for community development and economic growth.",
  },
  {
    title: "Fostering Innovation",
    icon: Rocket,
    description: "Encouraging creative and critical thinking to solve complex problems.",
  },
  {
    title: "Promoting Inclusivity",
    icon: Globe,
    description: "Ensuring that all our programs and initiatives are inclusive and accessible to everyone.",
  },
  {
    title: "Driving Social Change",
    icon: Megaphone,
    description: "Addressing social issues such as inequality, poverty, and environmental sustainability.",
  },
]

const responsibilities = [
  {
    title: "Ethical Conduct",
    icon: Scale,
    description: "Upholding the highest standards of integrity and ethical behavior in all our activities.",
  },
  {
    title: "Sustainable Practices",
    icon: Leaf,
    description: "Implementing eco-friendly and sustainable practices in all our programs.",
  },
  { title: "Quality and Excellence", icon: Award, description: "Striving for excellence in everything we do." },
  {
    title: "Community-Centered Approach",
    icon: Heart,
    description: "Placing the needs and aspirations of the community at the heart of our initiatives.",
  },
  {
    title: "Collaboration and Partnership",
    icon: HandshakeIcon,
    description: "Working collaboratively with other organizations, institutions, and stakeholders.",
  },
  {
    title: "Long-Term Impact",
    icon: Target,
    description: "Focusing on creating lasting positive changes that extend beyond immediate outcomes.",
  },
]

export default function OpportunityResponsibility() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="opportunity-responsibility">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">
            Our Opportunity and Responsibility
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, we recognize the immense opportunity we have to make a positive impact on society. With
            this opportunity comes great responsibility to act ethically, sustainably, and inclusively in all our
            endeavors.
          </p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Opportunity</h3>
            <div className="space-y-8">
              {opportunities.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 bg-primary/10 rounded-full p-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Responsibility</h3>
            <div className="space-y-8">
              {responsibilities.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 bg-secondary/10 rounded-full p-3">
                    <item.icon className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

