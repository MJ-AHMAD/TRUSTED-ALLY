"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  Lightbulb,
  Laptop,
  GraduationCap,
  HandshakeIcon,
  Heart,
  Leaf,
  FlaskConical,
  DollarSign,
} from "lucide-react"

const specialties = [
  {
    title: "Comprehensive Educational Programs",
    icon: BookOpen,
    description: "Tailored programs for all ages, available both online and offline.",
  },
  {
    title: "Community Empowerment",
    icon: Users,
    description: "Creating opportunities and access to education for every level of society.",
  },
  {
    title: "Innovative Learning Methods",
    icon: Lightbulb,
    description: "Engaging and effective education through innovative teaching methods and technology.",
  },
  {
    title: "Access to Technology",
    icon: Laptop,
    description: "Expanding education through technology and providing free or low-cost tools.",
  },
  {
    title: "Professional Development and Training",
    icon: GraduationCap,
    description: "Training programs for teachers, students, and professionals to enhance essential skills.",
  },
  {
    title: "Collaboration and Partnerships",
    icon: HandshakeIcon,
    description: "Strategic initiatives with various institutions to enhance education.",
  },
  {
    title: "Health and Well-being Initiatives",
    icon: Heart,
    description: "Programs focused on mental and physical health for students and communities.",
  },
  {
    title: "Environmental Awareness and Sustainability",
    icon: Leaf,
    description: "Educational activities promoting eco-friendly practices and environmental awareness.",
  },
  {
    title: "Research and Innovation",
    icon: FlaskConical,
    description: "Implementing new ideas and solutions to enhance the effectiveness of education.",
  },
  {
    title: "Scholarship and Financial Aid",
    icon: DollarSign,
    description: "Providing financial assistance to remove barriers to education access.",
  },
]

export default function Specialties() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="specialties">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Our Specialties</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, we excel in various areas to provide comprehensive educational solutions and community
            empowerment.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.title}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <specialty.icon className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">{specialty.title}</h3>
              </div>
              <p className="text-muted-foreground">{specialty.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

