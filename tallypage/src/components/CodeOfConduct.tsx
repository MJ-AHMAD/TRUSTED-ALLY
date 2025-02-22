"use client"

import { motion } from "framer-motion"
import { Heart, Users, Shield, Handshake, Star, AlertTriangle, MessageSquare, FileText } from "lucide-react"

const values = [
  {
    title: "Respect",
    icon: Heart,
    description: "Treat everyone with respect, kindness, and empathy. Value diverse perspectives and experiences.",
  },
  {
    title: "Inclusivity",
    icon: Users,
    description:
      "Promote an inclusive environment where everyone feels welcome and valued, regardless of their background or identity.",
  },
  {
    title: "Integrity",
    icon: Shield,
    description:
      "Act with honesty and integrity in all interactions and decisions. Uphold the highest standards of ethical behavior.",
  },
  {
    title: "Collaboration",
    icon: Handshake,
    description: "Foster a collaborative spirit, encouraging open communication and teamwork.",
  },
  {
    title: "Excellence",
    icon: Star,
    description: "Strive for excellence in all our endeavors, continuously seeking to improve and innovate.",
  },
]

const behaviors = [
  {
    title: "Be Respectful",
    description: "Show respect to all participants, including team members, contributors, and community members.",
  },
  {
    title: "Be Inclusive",
    description:
      "Ensure that everyone feels included and valued. Avoid exclusionary practices and make an effort to involve all participants.",
  },
  {
    title: "Be Considerate",
    description:
      "Consider the impact of your actions and words on others. Be mindful of different perspectives and experiences.",
  },
  {
    title: "Be Collaborative",
    description:
      "Work together in a spirit of cooperation and mutual support. Share knowledge and resources to help others succeed.",
  },
  {
    title: "Be Professional",
    description:
      "Maintain a professional demeanor in all interactions. Uphold the reputation of TRUSTED-ALLY and its projects.",
  },
]

export default function CodeOfConduct() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="code-of-conduct">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Code of Conduct</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            At TRUSTED-ALLY, we are committed to fostering a welcoming, inclusive, and respectful environment for
            everyone involved in our projects.
          </p>
        </motion.div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Values</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <value.icon className="h-6 w-6 text-primary mr-2" />
                    <h4 className="text-lg font-semibold text-foreground">{value.title}</h4>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Expected Behavior</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {behaviors.map((behavior, index) => (
                <motion.div
                  key={behavior.title}
                  className="bg-card rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">{behavior.title}</h4>
                  <p className="text-muted-foreground">{behavior.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Unacceptable Behavior</h3>
            <motion.div
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-destructive mr-2" />
                <h4 className="text-lg font-semibold text-foreground">The following behaviors are not tolerated:</h4>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Harassment of any kind</li>
                <li>
                  Discrimination based on race, gender, sexual orientation, disability, religion, or any other
                  characteristic
                </li>
                <li>Bullying, intimidation, or any form of coercion</li>
                <li>
                  Disruptive behavior that interferes with the participation of others or the progress of the project
                </li>
                <li>Sharing or promoting inappropriate, offensive, or harmful content</li>
              </ul>
            </motion.div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Reporting and Addressing Issues</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                className="bg-card rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary mr-2" />
                  <h4 className="text-lg font-semibold text-foreground">Reporting</h4>
                </div>
                <p className="text-muted-foreground">
                  If you experience or witness any behavior that violates this Code of Conduct, please report it to the
                  designated contact person or team. Reports can be made confidentially and will be taken seriously.
                </p>
              </motion.div>
              <motion.div
                className="bg-card rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-primary mr-2" />
                  <h4 className="text-lg font-semibold text-foreground">Investigation and Consequences</h4>
                </div>
                <p className="text-muted-foreground">
                  All reports of misconduct will be investigated promptly and thoroughly. Participants who violate this
                  Code of Conduct may face consequences, including warnings, suspension, or removal from the project.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="bg-card rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Commitment to Improvement</h3>
            <p className="text-muted-foreground mb-4">
              We are committed to continuously improving our Code of Conduct and ensuring it meets the needs of our
              community. Feedback and suggestions are always welcome.
            </p>
            <p className="text-muted-foreground">
              We will provide education and training to all participants to promote understanding and adherence to this
              Code of Conduct.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h3>
          <div className="space-y-8">
            {[
              {
                question: "Why have a Code of Conduct?",
                answer:
                  "A Code of Conduct helps create a safe and inclusive environment for all participants. It sets clear expectations for behavior and provides guidelines for addressing issues that may arise.",
              },
              {
                question: "What should I do if I witness or experience a violation of the Code of Conduct?",
                answer:
                  "If you witness or experience any behavior that violates the Code of Conduct, please report it to the designated contact person or team. Reports can be made confidentially and will be taken seriously.",
              },
              {
                question: "How are reports of misconduct handled?",
                answer:
                  "All reports of misconduct are investigated promptly and thoroughly. The privacy and confidentiality of all parties involved are respected. Participants who violate the Code of Conduct may face consequences, including warnings, temporary suspension, or permanent removal from the project.",
              },
              {
                question: "Can I provide feedback on the Code of Conduct?",
                answer:
                  "Yes, we welcome feedback and suggestions for improving our Code of Conduct. Please contact us with your thoughts and ideas.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

