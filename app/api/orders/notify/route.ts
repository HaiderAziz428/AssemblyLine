import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const OWNER_EMAIL = "haideraziz428@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const { order, items } = await request.json();

    const itemsHtml = items
      .map(
        (i: any) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0">${i.product.name}</td>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:center">×${i.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:right">Rs. ${((i.product.sale_price ?? i.product.price) * i.quantity).toLocaleString()}</td>
          </tr>`
      )
      .join("");

    const itemsText = items
      .map((i: any) => `• ${i.product.name} ×${i.quantity} — Rs. ${((i.product.sale_price ?? i.product.price) * i.quantity).toLocaleString()}`)
      .join("\n");

    const shortId = order.id.slice(0, 8).toUpperCase();

    // Send email via Gmail SMTP
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Assembly Line Orders" <${process.env.GMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: `🛒 New Order #${shortId} — Rs. ${order.total.toLocaleString()}`,
        text:
          `New Order Received!\n\n` +
          `Order ID: #${shortId}\n` +
          `Customer: ${order.customer_name}\n` +
          `Phone: ${order.customer_phone}\n` +
          `Email: ${order.customer_email || "—"}\n` +
          `Address: ${order.address}, ${order.city}\n` +
          `Notes: ${order.notes || "—"}\n\n` +
          `Items:\n${itemsText}\n\n` +
          `Total: Rs. ${order.total.toLocaleString()}\n` +
          `Payment: Cash on Delivery`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#000;padding:20px 24px;border-radius:8px 8px 0 0">
              <h1 style="color:#fff;margin:0;font-size:20px">🛒 New Order Received</h1>
              <p style="color:#f5c518;margin:4px 0 0;font-size:14px">Assembly Line</p>
            </div>

            <div style="background:#fff;border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 8px 8px">
              <table style="width:100%;margin-bottom:20px">
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px">Order ID</td>
                  <td style="padding:6px 0;font-weight:600;font-size:14px">#${shortId}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px">Customer</td>
                  <td style="padding:6px 0;font-size:14px">${order.customer_name}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px">Phone</td>
                  <td style="padding:6px 0;font-size:14px">${order.customer_phone}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px">Email</td>
                  <td style="padding:6px 0;font-size:14px">${order.customer_email || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#6b7280;font-size:14px">Address</td>
                  <td style="padding:6px 0;font-size:14px">${order.address}, ${order.city}</td>
                </tr>
                ${order.notes ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:14px">Notes</td><td style="padding:6px 0;font-size:14px">${order.notes}</td></tr>` : ""}
              </table>

              <h3 style="font-size:14px;color:#374151;margin:0 0 8px">Order Items</h3>
              <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
                <thead>
                  <tr style="background:#f9fafb">
                    <th style="padding:8px;text-align:left;font-size:13px;color:#6b7280">Product</th>
                    <th style="padding:8px;text-align:center;font-size:13px;color:#6b7280">Qty</th>
                    <th style="padding:8px;text-align:right;font-size:13px;color:#6b7280">Price</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>

              <div style="background:#f9fafb;padding:14px 16px;border-radius:8px;display:flex;justify-content:space-between">
                <span style="font-weight:700;font-size:16px">Total</span>
                <span style="font-weight:700;font-size:16px;color:#d97706">Rs. ${order.total.toLocaleString()}</span>
              </div>

              <div style="margin-top:16px;padding:12px 16px;background:#fef3c7;border-radius:8px;font-size:13px;color:#92400e">
                💵 Payment: <strong>Cash on Delivery</strong>
              </div>
            </div>
          </div>
        `,
      });
    }

    // Also keep Discord webhook as backup
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: `🛒 New Order #${shortId}`,
            color: 0xFFD700,
            fields: [
              { name: "Customer", value: `${order.customer_name}\n${order.customer_phone}`, inline: true },
              { name: "Address", value: `${order.address}, ${order.city}`, inline: true },
              { name: "Total", value: `Rs. ${order.total.toLocaleString()}`, inline: true },
              { name: "Items", value: itemsText },
            ],
            timestamp: new Date().toISOString(),
          }],
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order notify error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
