"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("testimonials-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible])

  const testimonials = [
    {
      name: "Michael Johnson",
      car: "Toyota Camry",
      rating: 5,
      text: "The team at Assembly Line fixed my electrical issues when two other shops couldn't figure it out. Fast, professional, and reasonably priced. Highly recommend!",
    },
    {
      name: "Sarah Williams",
      car: "Honda Accord",
      rating: 5,
      text: "I've been taking my car here for years. Their oil change service is quick and they always do a thorough inspection. The staff is friendly and knowledgeable.",
    },
    {
      name: "David Thompson",
      car: "Ford F-150",
      rating: 5,
      text: "Had my AC fixed here and it's working better than when the truck was new! Fair pricing and they explained everything they were doing. Great experience.",
    },
  ]

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-navy-800">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"></div>

      <div id="testimonials-section" className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gold-500/20 to-gold-300/20 rounded-full px-4 py-1 backdrop-blur-sm border border-gold-500/20 mb-4">
            <span className="text-gold-300 font-medium">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white font-['Impact'] tracking-wide">
            CUSTOMER <span className="text-gold-500">REVIEWS</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about our services.
          </p>
        </div>

        <div className="relative h-[400px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-all duration-700 transform",
                activeIndex === index
                  ? "opacity-100 translate-x-0"
                  : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full",
              )}
            >
              <Card
                className={cn(
                  "bg-navy-900/50 backdrop-blur-sm border-navy-700 h-full max-w-3xl mx-auto transition-all duration-500",
                  isVisible && "shadow-xl shadow-gold-500/10",
                )}
              >
                <CardContent className="pt-10 pb-6 px-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <div className="relative">
                    <Quote className="h-16 w-16 text-gold-500/10 absolute -top-6 -left-4" />
                    <p className="text-zinc-300 relative z-10 text-xl leading-relaxed">{testimonial.text}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-navy-800 pt-6 px-8">
                  <div>
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-zinc-500">{testimonial.car}</p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* Testimonial navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeIndex === index ? "bg-gold-500 w-6" : "bg-navy-700 hover:bg-navy-600",
              )}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
