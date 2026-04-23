import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_NUMBER = "03356630319";

export async function POST(request: NextRequest) {
  try {
    const { order, items } = await request.json();

    const itemsList = items
      .map((i: any) => `• ${i.product.name} ×${i.quantity} — Rs. ${((i.product.sale_price ?? i.product.price) * i.quantity).toLocaleString()}`)
      .join("\n");

    const message = encodeURIComponent(
      `🛒 *New Order Received!*\n\n` +
      `*Order ID:* #${order.id.slice(0, 8).toUpperCase()}\n` +
      `*Customer:* ${order.customer_name}\n` +
      `*Phone:* ${order.customer_phone}\n` +
      `*Address:* ${order.address}, ${order.city}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* Rs. ${order.total.toLocaleString()}\n` +
      `*Payment:* Cash on Delivery`
    );

    // WhatsApp API URL (opens WhatsApp with pre-filled message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=92${WHATSAPP_NUMBER.replace(/^0/, "")}&text=${message}`;

    // Also send via Discord webhook if configured
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "🛒 New Order!",
            color: 0xFFD700,
            fields: [
              { name: "Customer", value: `${order.customer_name}\n${order.customer_phone}`, inline: true },
              { name: "Address", value: `${order.address}, ${order.city}`, inline: true },
              { name: "Total", value: `Rs. ${order.total.toLocaleString()}`, inline: true },
              { name: "Items", value: itemsList },
            ],
            timestamp: new Date().toISOString(),
          }],
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, whatsappUrl });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
