import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

import { NextApiRequest, NextApiResponse } from "next"
import validator from "validator";  // Optional: use for email validation

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;

    // Firestore collection reference for contact messages
    const messagesRef = collection(db, "contactMessages");

    try {
      // Save to Firestore
      const docRef = await addDoc(messagesRef, {
        name,
        email,
        phone,
        message,
        timestamp: new Date(),
      });
      res.status(200).json({ message: "Message sent!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
