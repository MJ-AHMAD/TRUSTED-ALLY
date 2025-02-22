export default function Testimonials() {
  const testimonials = [
    {
      quote: "TRUSTED-ALLY has transformed our community through their innovative educational programs.",
      author: "Jane Doe, Community Leader",
    },
    {
      quote: "The impact of TRUSTED-ALLY's work on our students' lives has been truly remarkable.",
      author: "John Smith, School Principal",
    },
    {
      quote: "Working with TRUSTED-ALLY has opened up new opportunities for our organization.",
      author: "Alice Johnson, NGO Director",
    },
  ]

  return (
    <div className="bg-background py-24 sm:py-32" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-12 text-center">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-lg">
              <p className="text-lg text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <p className="text-sm font-semibold text-foreground">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

