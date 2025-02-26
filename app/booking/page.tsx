"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import LocationInput from "../components/LocationInputs";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth"; 

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const bookingData = { name, phone, pickup, destination, date };
  
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        alert(`Booking confirmed for ${name}!`);
        // Clear fields after successful booking
        setName("");
        setPhone("");
        setPickup({ address: "", lat: 0, lng: 0 });
        setDestination({ address: "", lat: 0, lng: 0 });
        setDate("");
      } else {
        alert("Booking failed!");
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (authLoading) {
    return <div className="text-center text-white text-xl">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-2xl font-bold text-red-500">You must be logged in to book a ride</h1>
        <button className="mt-4 bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-500" onClick={() => router.push("/")}>Go to Home</button>
        <button className="mt-4 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-400" onClick={() => router.push("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-gray-900 text-white px-6 py-12">
      <h1 className="text-4xl font-bold text-red-500 mb-6">Book a Ride</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500" required />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500" required />
          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />
          <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500" required />
          
          {/* Submit Button with Loading Spinner */}
          <button type="submit" className={`w-full bg-red-500 px-4 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition flex justify-center items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
