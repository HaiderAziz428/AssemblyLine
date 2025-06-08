"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BookingForm() {
  const [date, setDate] = useState<Date>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carMake: "",
    carModel: "",
    carYear: "",
    service: "electrical",
    message: "",
    time: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to WhatsApp or your backend
    console.log("Form submitted:", { ...formData, date: date?.toISOString() })
    setIsSubmitted(true)
  }

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
        <p className="text-zinc-400 mb-6">
          Thank you for choosing Assembly Line Auto Repair. We'll contact you shortly to confirm your appointment.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
        >
          Book Another Service
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">Book an Appointment</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-zinc-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-zinc-300">Preferred Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-navy-900/50 border-navy-700 hover:bg-navy-800/50 hover:border-gold-500/30",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-navy-800 border-navy-700">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    const day = date.getDay()
                    // Disable Sundays (0) and past dates
                    return day === 0 || date < new Date()
                  }}
                  className="bg-navy-800 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-zinc-300">
              Preferred Time
            </Label>
            <Select onValueChange={(value) => handleSelectChange("time", value)}>
              <SelectTrigger className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent className="bg-navy-800 border-navy-700">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carMake" className="text-zinc-300">
              Car Make
            </Label>
            <Input
              id="carMake"
              name="carMake"
              placeholder="Toyota"
              value={formData.carMake}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carModel" className="text-zinc-300">
              Car Model
            </Label>
            <Input
              id="carModel"
              name="carModel"
              placeholder="Camry"
              value={formData.carModel}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="carYear" className="text-zinc-300">
              Car Year
            </Label>
            <Input
              id="carYear"
              name="carYear"
              placeholder="2020"
              value={formData.carYear}
              onChange={handleChange}
              required
              className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">Service Type</Label>
          <RadioGroup
            defaultValue="electrical"
            onValueChange={(value) => handleSelectChange("service", value)}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="electrical" id="electrical" className="text-gold-500" />
              <Label htmlFor="electrical" className="text-zinc-300">
                Electrical
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mechanical" id="mechanical" className="text-gold-500" />
              <Label htmlFor="mechanical" className="text-zinc-300">
                Mechanical
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ac" id="ac" className="text-gold-500" />
              <Label htmlFor="ac" className="text-zinc-300">
                AC Service
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oil" id="oil" className="text-gold-500" />
              <Label htmlFor="oil" className="text-zinc-300">
                Oil Change
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-zinc-300">
            Additional Details
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Please describe the issue or service needed..."
            value={formData.message}
            onChange={handleChange}
            className="bg-navy-900/50 border-navy-700 min-h-[100px] focus:border-gold-500/50 focus:ring-gold-500/20"
          />
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur-sm opacity-70"></div>
        <Button
          type="submit"
          className="relative w-full bg-navy-900 hover:bg-navy-800 text-gold-500 border border-gold-500/30 font-bold"
        >
          Book Appointment
        </Button>
      </div>

      <p className="text-xs text-zinc-500 text-center">
        By submitting this form, you agree to our terms and conditions and privacy policy.
      </p>
    </form>
  )
}
