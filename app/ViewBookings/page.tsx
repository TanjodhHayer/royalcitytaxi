"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Booking Type Interface
interface Booking {
  id: string;
  name: string;
  phone: number;
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  destination: {
    address: string;
    lat: number;
    lng: number;
  };
  date: string;
}

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingRef = collection(db, "bookings");
        const snapshot = await getDocs(bookingRef);

        if (snapshot.empty) {
          setBookings([]);
        } else {
          const bookingsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Booking[];

          setBookings(bookingsList);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to delete a booking
  const deleteBooking = async (id: string) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((booking) => booking.id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again.");
    }
  };

  return (
    <div className="p-5 md-screen bg-gray-100">
      <h1 className="text-xl mb-2">All Bookings</h1>

      {/* Display loading or error messages */}
      {loading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow hidden md:block">
          <table className="w-full">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Pickup</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Destination</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Date</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking, index) => (
                <tr key={booking.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{index + 1}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap font-bold">{booking.name}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.phone}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.pickup.address}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.destination.address}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{booking.date}</td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {bookings.map((booking, index) => (
          <div key={booking.id} className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center justify-between text-sm">
              <div className="font-bold text-gray-800">#{index + 1}</div>
              <div className="text-gray-500">{booking.date}</div>
            </div>
            <div className="text-sm text-gray-700 font-bold">{booking.name}</div>
            <div className="text-sm text-gray-700">{booking.pickup.address} → {booking.destination.address}</div>
            <div className="text-sm text-gray-700">Phone: {booking.phone}</div>
            <button
              onClick={() => deleteBooking(booking.id)}
              className="w-full text-sm bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
