import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseClient";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { checkIfAdmin } from "@/lib/firebaseClient"; // Ensure that only admin can access this

// Firestore collection reference
const bookingsRef = collection(db, "bookings");

// Handle POST request (Save Booking)
export async function POST(req: Request) {
  // Check if the user is an admin
  const userIsAdmin = await checkIfAdmin();
  if (!userIsAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

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
export async function GET(req: Request) {
  // Check if the user is an admin
  const userIsAdmin = await checkIfAdmin();
  if (!userIsAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const snapshot = await getDocs(bookingsRef);
    const bookings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
