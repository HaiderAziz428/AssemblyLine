"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookingForm() {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showServiceError, setShowServiceError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carMake: "",
    carModel: "",
    carYear: "",
    services: [] as string[], // Changed to array for multiple services
    message: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show error only if no service is selected
    if (formData.services.length === 0) {
      setShowServiceError(true);
      setIsSubmitting(false);
      return;
    } else {
      setShowServiceError(false);
    }

    try {
      const bookingData = {
        ...formData,
        date: date ? format(date, "PPP") : "Not selected",
      };

      console.log("Submitting booking data:", bookingData);

      // Send to API route
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error:", errorData);
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("API success:", result);
      console.log("Form submitted:", bookingData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        `There was an error submitting your booking: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  const serviceOptions = [
    { id: "electrical", label: "Electrical" },
    { id: "mechanical", label: "Mechanical" },
    { id: "ac", label: "AC Service" },
    { id: "oil", label: "Oil Change" },
  ];

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-zinc-400 mb-6">
          Thank you for choosing Assembly Line Auto Repair. We'll contact you
          shortly to confirm your appointment.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              email: "",
              carMake: "",
              carModel: "",
              carYear: "",
              services: [],
              message: "",
              time: "",
            });
            setDate(undefined);
          }}
          variant="outline"
          className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
        >
          Book Another Service
        </Button>
      </div>
    );
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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-navy-900/50 border-navy-700 hover:bg-navy-800/50 hover:border-gold-500/30",
                    !date && "text-muted-foreground"
                  )}
                  onClick={() => setPopoverOpen(true)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-navy-800 border-navy-700">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                      setPopoverOpen(false);
                    }
                  }}
                  initialFocus
                  disabled={(date) => {
                    const day = date.getDay();
                    // Disable Fridays (5) and past dates
                    return day === 5 || date < new Date();
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
            <Select
              onValueChange={(value) => handleSelectChange("time", value)}
            >
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
          <Label className="text-zinc-300">
            Service Type (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {serviceOptions.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={formData.services.includes(service.id)}
                  onCheckedChange={(checked) =>
                    handleServiceChange(service.id, checked as boolean)
                  }
                  className="border-gold-500/50 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
                />
                <Label htmlFor={service.id} className="text-zinc-300">
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
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
          disabled={isSubmitting || formData.services.length === 0}
          className="relative w-full bg-navy-900 hover:bg-navy-800 text-gold-500 border border-gold-500/30 font-bold disabled:opacity-50"
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </Button>
      </div>

      {showServiceError && (
        <p className="text-xs text-red-400 text-center">
          Please select at least one service type.
        </p>
      )}

      <p className="text-xs text-zinc-500 text-center">
        By submitting this form, you agree to our terms and conditions and
        privacy policy.
      </p>
    </form>
  );
}
