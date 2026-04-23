"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const SERVICE_OPTIONS = [
  { id: "electrical", label: "Electrical" },
  { id: "mechanical", label: "Mechanical" },
  { id: "ac", label: "AC Service" },
  { id: "oil", label: "Oil Change" },
];

const FRIDAY = 5;

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  carMake: "",
  carModel: "",
  carYear: "",
  services: [] as string[],
  message: "",
  time: "",
};

export default function BookingForm() {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
    setSubmitError(null);

    if (formData.services.length === 0) {
      setSubmitError("Please select at least one service type.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, date: date ? format(date, "PPP") : "Not selected" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData(emptyForm);
    setDate(undefined);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
        <p className="text-zinc-400 mb-6">
          Thank you for choosing Assembly Line Auto Repair. We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
        >
          Book Another Service
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <h3 className="text-2xl font-bold text-white">Book an Appointment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-zinc-300">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="03XX-XXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-300">Preferred Date</Label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-navy-900/50 border-navy-700 hover:bg-navy-800/50 hover:border-gold-500/30",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                {date ? format(date, "PPP") : <span>Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-navy-800 border-navy-700">
              <p className="text-xs text-zinc-400 px-3 pt-2">Fridays are closed</p>
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
                disabled={(d) => d.getDay() === FRIDAY || d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="bg-navy-800 text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-zinc-300">Preferred Time</Label>
          <Select onValueChange={(v) => setFormData((p) => ({ ...p, time: v }))}>
            <SelectTrigger id="time" className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="bg-navy-800 border-navy-700">
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="carMake" className="text-zinc-300">Car Make</Label>
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
          <Label htmlFor="carModel" className="text-zinc-300">Car Model</Label>
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
          <Label htmlFor="carYear" className="text-zinc-300">Car Year</Label>
          <Input
            id="carYear"
            name="carYear"
            placeholder="2020"
            inputMode="numeric"
            value={formData.carYear}
            onChange={handleChange}
            required
            className="bg-navy-900/50 border-navy-700 focus:border-gold-500/50 focus:ring-gold-500/20"
          />
        </div>
      </div>

      {/* Service selection */}
      <fieldset className="space-y-2">
        <legend className="text-zinc-300 text-sm font-medium">
          Service Type <span className="text-zinc-500">(select all that apply)</span>
        </legend>
        <div className="grid grid-cols-2 gap-4 pt-1">
          {SERVICE_OPTIONS.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={formData.services.includes(service.id)}
                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                className="border-gold-500/50 data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
              />
              <Label htmlFor={service.id} className="text-zinc-300 cursor-pointer">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-zinc-300">Additional Details</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe the issue or service needed..."
          value={formData.message}
          onChange={handleChange}
          className="bg-navy-900/50 border-navy-700 min-h-[100px] focus:border-gold-500/50 focus:ring-gold-500/20"
        />
      </div>

      {submitError && (
        <div role="alert" className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-3 py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {submitError}
        </div>
      )}

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur-sm opacity-70" aria-hidden="true" />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="relative w-full bg-navy-900 hover:bg-navy-800 text-gold-500 border border-gold-500/30 font-bold disabled:opacity-50"
        >
          {isSubmitting ? "Booking…" : "Book Appointment"}
        </Button>
      </div>

      <p className="text-xs text-zinc-500 text-center">
        By submitting this form, you agree to our terms and conditions.
      </p>
    </form>
  );
}
