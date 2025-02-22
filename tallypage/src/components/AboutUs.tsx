"use client"

import { motion } from "framer-motion"

export default function AboutUs() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="about">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">About Us</h2>
          <motion.p
            className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TRUSTED-ALLY is dedicated to building a brighter future for all through education, empowerment, and
            innovation. Our work is a testament to our commitment to creating a positive and lasting impact on society.
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg p-8 shadow-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
          <p className="text-muted-foreground">
            At TRUSTED-ALLY, our mission is to empower individuals and communities by providing access to quality
            education, fostering community development, and promoting sustainable practices. We are dedicated to
            creating a platform that leverages cutting-edge tools and technologies to drive positive change and societal
            advancement.
          </p>
        </motion.div>

        <motion.div
          className="bg-card rounded-lg p-8 shadow-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Vision and Future Goals</h3>
          <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
            "With a Vision for Tomorrow's Leaders" – MJ-AHMAD
          </blockquote>
          <p className="text-muted-foreground mb-6">
            At TRUSTED-ALLY, we are committed to building a future where innovation, integrity, and inclusivity are the
            driving forces behind our success. Our mission is to lead by example, fostering a community where businesses
            thrive, communities grow, and education flourishes.
          </p>
          <div className="bg-primary/10 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-foreground mb-2">A Project by TRUSTED ALLY</h4>
            <p className="text-muted-foreground">
              "Together Towards a Brighter Future" – TRUSTED ALLY believes that a better and enlightened society can be
              built through education. TRUSTED ALLY dedicates all its resources and activities to achieving this goal.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {["Education", "Empowerment", "Innovation"].map((pillar, index) => (
            <motion.div
              key={pillar}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">{pillar}</h3>
              <p className="text-muted-foreground">
                We believe that {pillar.toLowerCase()} is key to creating a better world. Through our initiatives, we
                strive to make a difference in people's lives and communities.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

