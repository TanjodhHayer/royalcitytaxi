import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Firestore collection reference
const bookingsRef = collection(db, "bookings");

// Handle POST request (Save Booking)
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validation
    if (!data.name || !data.pickup || !data.destination || !data.date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Firestore
    const docRef = await addDoc(bookingsRef, data);

    return NextResponse.json({ message: "Booking confirmed", id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}

// Handle GET request (Fetch Bookings)
export async function GET() {
  try {
    const snapshot = await getDocs(bookingsRef);
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
