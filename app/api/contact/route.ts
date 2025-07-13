import { db } from "@/lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  // Firestore collection reference for contact messages
  const messagesRef = collection(db, "contactMessages");

  try {
    // Save to Firestore
    await addDoc(messagesRef, {
      name,
      email,
      phone,
      message,
      timestamp: new Date(),
    });

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER, // Your Gmail address
        pass: process.env.NEXT_PUBLIC_GMAIL_APP_PASSWORD, // App Password
      },
    });

    // Email options with multiple recipients
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_GMAIL_USER,
      to: ["dispatch@royalcitytaxi.com", "manager@royalcitytaxi.com"], // Add multiple emails here
      subject: `New Message From from ${name}`,
      text: `This is an automated notification. Contact the customer directly using the information below if responding.
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
      
      Sent from the royalcitytaxi website contact form.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent!" });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
