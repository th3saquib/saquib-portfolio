import { NextRequest, NextResponse } from "next/server";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, website } = await request.json();

    // Honeypot check for spam bots
    if (website) {
      return NextResponse.json({ success: true, messageId: "bot-ignored" });
    }

    // Input validation & type checks
    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().slice(0, 100);
    const trimmedEmail = email.trim().slice(0, 254);
    const trimmedMessage = typeof message === "string" ? message.trim().slice(0, 5000) : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const receiverEmail = process.env.BREVO_RECEIVER_EMAIL;

    if (!apiKey || !senderEmail || !receiverEmail) {
      console.error("Missing Brevo environment variables");
      return NextResponse.json(
        { success: false, error: "Mail server configuration error." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);

    // Call Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Enquiry",
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: "Saquib",
          },
        ],
        replyTo: {
          email: trimmedEmail,
          name: trimmedName,
        },
        subject: `New Portfolio Contact: ${trimmedName}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333333;
                }
                .container {
                  padding: 20px;
                  border: 1px solid #eeeeee;
                  border-radius: 5px;
                  max-width: 600px;
                  margin: 0 auto;
                }
                h2 {
                  color: #2c3e50;
                  border-bottom: 2px solid #3498db;
                  padding-bottom: 10px;
                }
                .field {
                  margin-bottom: 15px;
                }
                .label {
                  font-weight: bold;
                  color: #7f8c8d;
                }
                .value {
                  background-color: #f9f9f9;
                  padding: 10px;
                  border-radius: 3px;
                  border-left: 3px solid #bdc3c7;
                  white-space: pre-wrap;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>New Contact Enquiry</h2>
                <div class="field">
                  <div class="label">Name:</div>
                  <div class="value">${safeName}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value">${safeEmail}</div>
                </div>
                <div class="field">
                  <div class="label">Message / Project Description:</div>
                  <div class="value">${safeMessage || "No message description provided."}</div>
                </div>
              </div>
            </body>
          </html>
        `,
        textContent: `New Portfolio Contact Enquiry\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nMessage: ${trimmedMessage || "No message description provided."}`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Brevo API error response:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to send message via Brevo." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (error: unknown) {
    console.error("Enquiry submission error:", error);
    const message = error instanceof Error ? error.message : "An error occurred while sending your message.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
