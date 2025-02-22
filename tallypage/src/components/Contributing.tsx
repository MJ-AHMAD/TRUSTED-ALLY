"use client"

import { motion } from "framer-motion"
import { Code, MessageSquare, Bug, Book, Users, Lightbulb, Heart } from "lucide-react"

const contributionAreas = [
  {
    title: "Code Contributions",
    icon: Code,
    description: "Help improve our codebase by submitting pull requests, fixing bugs, or adding new features.",
  },
  {
    title: "Documentation",
    icon: Book,
    description: "Enhance our documentation to make it more comprehensive, clear, and up-to-date.",
  },
  {
    title: "Bug Reports",
    icon: Bug,
    description: "Report bugs or issues you encounter to help us improve the stability of our projects.",
  },
  {
    title: "Feature Suggestions",
    icon: Lightbulb,
    description: "Propose new ideas or features that could enhance our projects and benefit the community.",
  },
  {
    title: "Community Support",
    icon: Users,
    description: "Help other contributors by answering questions and providing guidance in our community forums.",
  },
  {
    title: "Translations",
    icon: MessageSquare,
    description: "Contribute translations to make our projects accessible to a global audience.",
  },
]

const contributionSteps = [
  {
    title: "Fork the Repository",
    description: "Start by forking the TRUSTED-ALLY repository you want to contribute to.",
  },
  {
    title: "Set Up Your Environment",
    description: "Clone your fork and set up the development environment following our setup guide.",
  },
  {
    title: "Choose an Issue",
    description: "Look for open issues or create a new one to discuss your proposed changes.",
  },
  {
    title: "Make Your Changes",
    description: "Implement your changes, following our coding standards and guidelines.",
  },
  {
    title: "Test Your Changes",
    description: "Ensure your changes work as expected and add tests if necessary.",
  },
  {
    title: "Submit a Pull Request",
    description: "Create a pull request with a clear description of your changes and reference any related issues.",
  },
]

export default function Contributing() {
  return (
    <div className="bg-background py-24 sm:py-32" id="contributing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-8 text-center">
          Contributing to TRUSTED-ALLY
        </h2>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Learn how you can contribute to our mission and make a difference in education and community empowerment.
        </p>
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">How You Can Contribute</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {contributionAreas.map((area, index) => (
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
                    <h4 className="text-lg font-semibold text-foreground">{area.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Contribution Process</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {contributionSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      {index + 1}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
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
            <h3 className="text-2xl font-bold text-foreground mb-4">Contributing Guidelines</h3>
            <p className="text-muted-foreground mb-4">
              Before making a contribution, please read our detailed Contributing Guidelines. These guidelines provide
              important information on our coding standards, commit message format, and other best practices to ensure a
              smooth collaboration process.
            </p>
            <div className="flex justify-center">
              <a
                href="#guidelines"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Read Contributing Guidelines
              </a>
            </div>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-2xl font-bold text-foreground">Thank You for Contributing!</h3>
            </div>
            <p className="text-muted-foreground">
              Your contributions, big or small, make a significant impact on our mission to empower communities through
              education. We appreciate your dedication and support in making TRUSTED-ALLY projects better for everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

