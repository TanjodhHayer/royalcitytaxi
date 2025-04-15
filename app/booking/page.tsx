"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import LocationInput from "../components/LocationInputs";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { IoTimeOutline } from "react-icons/io5";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
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

  // Convert 24-hour time to 12-hour time format (AM/PM)
  const formatTimeTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hoursInt = parseInt(hours);
    const ampm = hoursInt >= 12 ? "PM" : "AM";
    hoursInt = hoursInt % 12;
    hoursInt = hoursInt ? hoursInt : 12; // the hour '0' should be '12'
    return `${hoursInt}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert the time to 12-hour format before sending it
    const formattedTime = formatTimeTo12Hour(time);

    const bookingData = {
      name,
      email, // included email in the booking data
      phone,
      pickup,
      destination,
      pickupAddress: pickup.address || "", // Store a copy of the pickup address
      destinationAddress: destination.address || "", // Store a copy of the destination address
      date: date ? date.toISOString().split("T")[0] : "", // Format date as YYYY-MM-DD
      time: formattedTime, // Store the formatted time
      createdAt: new Date(),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      
      if (response.ok) {
        // Send the email after the booking is confirmed
        const emailResponse = await fetch("/api/sendBookingEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });
  
        if (emailResponse.ok) {
          alert(`Booking confirmed for ${name}!`);
          // Reset fields after successful booking
          setName("");
          setEmail("");
          setPhone("");
          setPickup({ address: "", lat: 0, lng: 0 });
          setDestination({ address: "", lat: 0, lng: 0 });
          setDate(null);
          setTime("");
        } else {
          alert("Failed to send booking email!");
        }
      } else {
        alert("Booking failed!");
      }
    } catch (error) {
      console.error("Error submitting booking or sending email:", error);
      alert("An error occurred. Please try again.");
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
            required
          />
          {/* New Email Field */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              // Only allow numbers and dashes in the input
              const value = e.target.value.replace(/[^0-9-]/g, "");
              setPhone(value);
            }}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
            required
          />

          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />

          <div className="flex items-center space-x-2">
            {/* Calendar Icon */}
            <FaCalendarAlt className="text-gray-500 text-xl" />

            {/* DatePicker */}
            <DatePicker
              id="date"
              selected={date}
              onChange={(date: Date | null) => setDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <IoTimeOutline className="text-gray-500 text-xl" />
            <input
              type="time"
              id="time"
              value={time || ""}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />

          {/* Submit Button with Loading Spinner */}
          <button
            type="submit"
            className={`w-full bg-red-500 px-4 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition flex justify-center items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
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
