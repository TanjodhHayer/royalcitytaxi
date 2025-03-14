"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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
  time: string;
}

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="w-full h-screen bg-gray-900 p-5 pt-32">
      <h1 className="text-2xl font-semibold text-white mb-6">All Bookings</h1>

      {/* Display loading or error messages */}
      {loading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow bg-gray-800 md:block hidden">
          <table className="w-full text-white">
            <thead className="border-b-2 border-gray-700">
            <tr>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Name</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Phone</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Pickup</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Pickup Date</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Pickup Time</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Destination</th>
              <th className="p-4 text-sm font-semibold tracking-wide text-center">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                >
                  <td className="p-4 text-sm text-gray-300 font-bold text-center">{booking.name}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">{booking.phone}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">{booking.pickup.address}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">{booking.date}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">{booking.time}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">{booking.destination.address}</td>
                  <td className="p-4 text-sm text-gray-300 text-center">
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
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-gray-800 text-white space-y-3 p-4 rounded-lg shadow ">
            <div className="flex items-center justify-between text-sm">
              <div className="text-sm text-gray-300 font-bold ">{booking.name}</div>
              <div> 
              <div className="text-gray-400">{booking.date}</div>
              <div className="text-gray-400">{booking.time}</div>
              </div>
            </div>
            <div className="space-y-3 text-center">
              <div className="grid grid-cols-1 gap-2">
                <div className="text-sm text-gray-300">
                  <span className="font-semibold">Pickup:</span>
                  <div className="ml-4">{booking.pickup.address}</div>
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-semibold">Drop off:</span>
                  <div className="ml-4">{booking.destination.address}</div>
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-semibold">Phone:</span> {booking.phone}
                </div>
              </div>
            </div>

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
