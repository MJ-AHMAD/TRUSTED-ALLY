"use client"

import { motion } from "framer-motion"
import { Book, Users, Heart, Leaf, Cpu, HandshakeIcon } from "lucide-react"

const workAreas = [
  {
    title: "Educational Programs",
    icon: Book,
    items: ["Access to Quality Education", "Innovative Learning Methods", "Scholarships and Financial Aid"],
  },
  {
    title: "Community Empowerment",
    icon: Users,
    items: ["Skills Development", "Women's Empowerment", "Youth Leadership"],
  },
  {
    title: "Health and Well-being",
    icon: Heart,
    items: ["Health Education", "Mental Health Support", "Nutritional Programs"],
  },
  {
    title: "Environmental Sustainability",
    icon: Leaf,
    items: ["Green Initiatives", "Environmental Education", "Community Clean-up Drives"],
  },
  {
    title: "Technology and Innovation",
    icon: Cpu,
    items: ["Tech Education", "Innovation Hubs", "Digital Literacy"],
  },
  {
    title: "Partnerships and Collaborations",
    icon: HandshakeIcon,
    items: ["Collaborative Projects", "Community Involvement", "Resource Sharing"],
  },
]

export default function OurWork() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="our-work">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Our Work</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, our work is driven by our commitment to education, community empowerment, and sustainable
            development. We believe in creating lasting impacts through innovative programs and initiatives that cater
            to the diverse needs of our communities.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <area.icon className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
              </div>
              <ul className="space-y-2">
                {area.items.map((item, itemIndex) => (
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

