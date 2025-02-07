"use client";
import { useState } from "react";
import LocationInput from "../components/LocationInputs";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name}!`);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="center-page">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-500 text-center mb-4">Book a Ride</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              required
            />
          </div>

          {/* Pickup Location Autocomplete */}
          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />

          {/* Destination Location Autocomplete */}
          <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />

          <div>
            <label className="block text-lg font-semibold mb-1">Date & Time</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              required
            />
          </div>

          <div className="flex justify-between">
            <button type="button" className="bg-gray-600 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
