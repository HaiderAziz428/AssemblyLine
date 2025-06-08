"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone, Calendar, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-12 w-12 rounded-full bg-zinc-800 hover:bg-zinc-700 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      <Link href="tel:+1234567890">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
        </Button>
      </Link>

      <Link href="#contact">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
          aria-label="Book appointment"
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
