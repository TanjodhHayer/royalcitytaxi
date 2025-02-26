// app/api/contact/route.ts
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

import { NextResponse } from "next/server";

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
    return NextResponse.json({ message: "Message sent!" });
  } catch (error) {
    console.error(error);  // Log the error
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
  
}
