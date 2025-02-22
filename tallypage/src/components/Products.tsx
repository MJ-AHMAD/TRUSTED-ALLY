"use client"

import { motion } from "framer-motion"
import { BookOpen, Monitor, Briefcase, Heart, Leaf, Cpu, Users } from "lucide-react"

const productCategories = [
  {
    title: "Educational Toolkits",
    icon: BookOpen,
    items: ["Learning Modules", "Teacher Resources", "Student Resources"],
  },
  {
    title: "E-Learning Platforms",
    icon: Monitor,
    items: ["Virtual Classrooms", "Online Courses", "Assessment Tools"],
  },
  {
    title: "Skill Development Programs",
    icon: Briefcase,
    items: ["Vocational Training", "Soft Skills Training", "Entrepreneurship Training"],
  },
  {
    title: "Health and Wellness Products",
    icon: Heart,
    items: ["Health Education Kits", "Mental Health Resources", "Nutritional Supplements"],
  },
  {
    title: "Environmental Sustainability Solutions",
    icon: Leaf,
    items: ["Green Technology Kits", "Eco-friendly Products", "Community Garden Projects"],
  },
  {
    title: "Technology and Innovation Products",
    icon: Cpu,
    items: ["Digital Literacy Kits", "Tech Education Programs", "Innovation Labs"],
  },
  {
    title: "Community Development Programs",
    icon: Users,
    items: ["Community Empowerment Kits", "Women's Empowerment Products", "Youth Leadership Programs"],
  },
]

export default function Products() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="products">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Our Products</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, we offer a variety of products and services designed to enhance education, empower
            communities, and promote sustainable development. Our products are developed with a focus on quality,
            innovation, and inclusivity to ensure they meet the diverse needs of our beneficiaries.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <category.icon className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
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

