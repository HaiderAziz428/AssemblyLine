import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    console.log("API route called");
    console.log("DISCORD_WEBHOOK_URL exists:", !!DISCORD_WEBHOOK_URL);

    const bookingData = await request.json();
    console.log("Booking data received:", bookingData);

    if (!DISCORD_WEBHOOK_URL) {
      console.error("Discord webhook URL not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const embed = {
      title: "🚗 New Appointment Booking",
      color: 0xffd700, // Gold color
      fields: [
        {
          name: "👤 Customer Information",
          value: `**Name:** ${bookingData.name}\n**Phone:** ${bookingData.phone}\n**Email:** ${bookingData.email}`,
          inline: false,
        },
        {
          name: "🚙 Vehicle Information",
          value: `**Make:** ${bookingData.carMake}\n**Model:** ${bookingData.carModel}\n**Year:** ${bookingData.carYear}`,
          inline: true,
        },
        {
          name: "📅 Appointment Details",
          value: `**Date:** ${bookingData.date}\n**Time:** ${bookingData.time}`,
          inline: true,
        },
        {
          name: "🔧 Services Requested",
          value:
            bookingData.services.length > 0
              ? bookingData.services.join(", ")
              : "None selected",
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Assembly Line Auto Repair - Booking System",
      },
    };

    if (bookingData.message) {
      embed.fields.push({
        name: "💬 Additional Details",
        value: bookingData.message,
        inline: false,
      });
    }

    console.log("Sending to Discord webhook...");
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    console.log("Discord response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord webhook error:", errorText);
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log("Successfully sent to Discord");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}
