"use client";
import { useEffect, useState } from "react";
import { checkIfAdmin } from "@/lib/firebase"; // Path to your Firebase helper function
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; // Firebase initialization
import { collection, getDocs } from "firebase/firestore";

// Type for Booking data
interface Booking {
  id: string;
  name: string;
  pickup: string;
  destination: string;
  date: string;
}

export default function ViewBookings() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      const bookingRef = collection(db, "bookings"); // Reference to 'bookings' collection
      const snapshot = await getDocs(bookingRef);
      const bookingsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsList as Booking[]);
    };

    if (isAdmin) {
      fetchBookings();
    }
  }, [isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-4xl font-bold text-red-500 text-center mb-6">All Bookings</h1>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Pickup Location</th>
              <th className="border px-4 py-2">Destination</th>
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border px-4 py-2">{booking.name}</td>
                <td className="border px-4 py-2">{booking.pickup}</td>
                <td className="border px-4 py-2">{booking.destination}</td>
                <td className="border px-4 py-2">{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
