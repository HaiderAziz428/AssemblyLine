import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 500);
}

function validateBooking(data: Record<string, unknown>): string | null {
  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    return "Name is required (min 2 characters).";
  }
  if (!data.phone || typeof data.phone !== "string" || data.phone.trim().length < 7) {
    return "A valid phone number is required.";
  }
  if (!data.email || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "A valid email address is required.";
  }
  if (!data.carMake || typeof data.carMake !== "string" || !data.carMake.trim()) {
    return "Car make is required.";
  }
  if (!data.services || !Array.isArray(data.services) || data.services.length === 0) {
    return "At least one service must be selected.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("Discord webhook URL not configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const validationError = validateBooking(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const name = sanitize(body.name);
  const phone = sanitize(body.phone);
  const email = sanitize(body.email);
  const carMake = sanitize(body.carMake);
  const carModel = sanitize(body.carModel);
  const carYear = sanitize(body.carYear);
  const date = sanitize(body.date);
  const time = sanitize(body.time);
  const message = sanitize(body.message);
  const services = (Array.isArray(body.services) ? body.services : [])
    .map((s) => sanitize(s))
    .filter(Boolean);

  const embed = {
    title: "🚗 New Appointment Booking",
    color: 0xffd700,
    fields: [
      {
        name: "👤 Customer",
        value: `**Name:** ${name}\n**Phone:** ${phone}\n**Email:** ${email}`,
        inline: false,
      },
      {
        name: "🚙 Vehicle",
        value: `**Make:** ${carMake}\n**Model:** ${carModel}\n**Year:** ${carYear}`,
        inline: true,
      },
      {
        name: "📅 Appointment",
        value: `**Date:** ${date || "Not selected"}\n**Time:** ${time || "Not selected"}`,
        inline: true,
      },
      {
        name: "🔧 Services",
        value: services.join(", ") || "None",
        inline: false,
      },
      ...(message
        ? [{ name: "💬 Additional Details", value: message, inline: false }]
        : []),
    ],
    timestamp: new Date().toISOString(),
    footer: { text: "Assembly Line Auto Repair — Booking System" },
  };

  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord webhook error:", text);
      throw new Error(`Discord responded with ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 });
  }
}
