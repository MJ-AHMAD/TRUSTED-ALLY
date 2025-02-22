"use client"

import { motion } from "framer-motion"

const approachSteps = [
  {
    title: "Needs Assessment and Planning",
    description:
      "Conduct comprehensive needs assessments in target communities to understand educational and social gaps. Develop strategic plans based on the findings, with clear objectives and timelines.",
  },
  {
    title: "Community Engagement",
    description:
      "Engage with local communities to understand their needs and involve them in the planning process. Build trust and establish strong relationships with community leaders and stakeholders.",
  },
  {
    title: "Resource Mobilization",
    description:
      "Secure funding and resources through grants, donations, and partnerships. Efficiently allocate resources to maximize impact and sustainability.",
  },
  {
    title: "Program Development",
    description:
      "Design and develop educational programs tailored to different age groups and learning needs. Incorporate innovative teaching methods and technologies to enhance learning experiences.",
  },
  {
    title: "Pilot Testing and Feedback",
    description:
      "Implement pilot programs to test the effectiveness of new initiatives. Collect feedback from participants and stakeholders to refine and improve programs.",
  },
  {
    title: "Collaboration and Partnerships",
    description:
      "Establish partnerships with educational institutions, non-profit organizations, government agencies, and private sector entities. Collaborate on joint initiatives to leverage expertise and resources.",
  },
  {
    title: "Capacity Building",
    description:
      "Provide training and professional development for teachers, community workers, and program facilitators. Enhance the capacity of local communities to sustain and expand educational initiatives.",
  },
  {
    title: "Monitoring and Evaluation",
    description:
      "Implement robust monitoring and evaluation systems to track program progress and outcomes. Use data and insights to make informed decisions and continuous improvements.",
  },
  {
    title: "Awareness and Advocacy",
    description:
      "Raise awareness about the importance of education and community empowerment through campaigns and events. Advocate for policy changes and support at the local, national, and international levels.",
  },
  {
    title: "Scalability and Sustainability",
    description:
      "Develop scalable models that can be replicated in other communities and regions. Ensure long-term sustainability through community ownership and ongoing support.",
  },
  {
    title: "Innovation and Adaptation",
    description:
      "Stay updated with the latest trends and advancements in education and technology. Continuously adapt programs and strategies to meet evolving needs and challenges.",
  },
  {
    title: "Transparency and Accountability",
    description:
      "Maintain transparency in all activities, operations, and financial management. Regularly report progress and impact to stakeholders and the community.",
  },
  {
    title: "Long-term Impact",
    description:
      "Focus on creating lasting impact through sustainable and scalable initiatives. Empower future generations with the skills and knowledge they need to thrive.",
  },
]

export default function Approach() {
  return (
    <div className="bg-background py-24 sm:py-32 relative overflow-hidden" id="approach">
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
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">Approach of TRUSTED-ALLY</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive approach ensures that we create lasting impact and empower communities through education
            and innovation.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {approachSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-card rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

