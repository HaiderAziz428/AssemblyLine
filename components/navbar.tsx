"use client"

import { useState, useEffect } from "react"
import { Phone, Wrench, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-navy-900/90 backdrop-blur-md border-b border-navy-800 shadow-lg" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                {/* Gear icon with wrench */}
                <div className="absolute inset-0 bg-gold-500 rounded-full flex items-center justify-center">
                  <Settings className="h-6 w-6 text-navy-900 absolute" />
                  <Wrench className="h-5 w-5 text-navy-900 absolute transform rotate-45" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gold-500 leading-none font-['Impact']">ASSEMBLY LINE</span>
                <span className="text-sm font-medium text-gold-300 leading-none font-['Impact']">AUTO REPAIR</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Button
              variant="default"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold shadow-lg shadow-gold-500/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Phone size={16} className="mr-2" />
              Book Service
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
