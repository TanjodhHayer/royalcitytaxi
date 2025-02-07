"use client";
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import LocationInput from "../components/LocationInputs";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 49.2296905, lng: -122.8860855 }; // Default to New Westminster

export default function BookingPage() {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name}!`);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
        <div className="center-page">
          <h1 className="text-4xl font-bold text-red-500 text-center mb-6">
            Book a Ride
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            {/* Pickup Location Autocomplete */}
            <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />

            {/* Destination Location Autocomplete */}
            <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-1">Date & Time</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-white"
                required
              />
            </div>

            <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
              Confirm Booking
            </button>
          </form>

          {/* ✅ Google Maps - Markers Appear After Selection */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={pickup.lat !== 0 ? { lat: pickup.lat, lng: pickup.lng } : defaultCenter}
            zoom={pickup.lat !== 0 || destination.lat !== 0 ? 12 : 10}
          >
            {pickup.lat !== 0 && <Marker position={{ lat: pickup.lat, lng: pickup.lng }} />}
            {destination.lat !== 0 && <Marker position={{ lat: destination.lat, lng: destination.lng }} />}
          </GoogleMap>

        </div>
      </div>
    </LoadScript>
  );
}
