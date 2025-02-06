"use client";
import { useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name}!`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Book a Ride</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pickup Location"
          className="w-full p-2 border rounded"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          className="w-full p-2 border rounded"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
