import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();

    // Nodemailer transporter setup using environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER, // Load from .env.local
        pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD, // Load from .env.local
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: "dispatch@royalcitytaxi.com",
      subject: `Booking Confirmation for ${bookingData.name}`,
      text: `Booking details:
      Name: ${bookingData.name}
      Phone: ${bookingData.phone}
      Email: ${bookingData.email}
      Pickup Location: ${bookingData.pickupAddress}
      Destination: ${bookingData.destinationAddress}
      Date: ${bookingData.date}
      Time: ${bookingData.time}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Booking email sent!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email", details: error }, { status: 500 });
  }
}
