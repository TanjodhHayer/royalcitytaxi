
import { useState } from "react";
import LocationInput from "../components/LocationInputs";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = { name, pickup, destination, date };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(`Booking confirmed for ${name}!`);
        setName(""); setPickup({ address: "", lat: 0, lng: 0 }); setDestination({ address: "", lat: 0, lng: 0 }); setDate("");
        onClose();
      } else {
        alert("Booking failed!");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="center-page">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-500 text-right mb-4">Book a Ride</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white" required />
          </div>

          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />
          <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />

          <div>
            <label className="block text-lg font-semibold mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white" required />
          </div>

          <div className="flex gap-2">
            <button type="submit" className={`red-button bg-red-500 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            <button type="button" className="red-button bg-gray-600 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
