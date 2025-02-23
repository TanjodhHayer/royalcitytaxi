import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"; // Firebase authentication
import LocationInput from "../components/LocationInputs";
import { useRouter } from "next/navigation";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // Added state for phone number
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null); // Store current user state
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Get the currently authenticated user
    setUser(currentUser); // Set the user state when modal opens
  }, [isOpen]); // Depend on `isOpen` so it checks when modal opens

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = { name, phone, pickup, destination, date }; // Include phone number in booking data

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        alert(`Booking confirmed for ${name}!`);
        setName("");
        setPhone(""); // Reset phone input
        setPickup({ address: "", lat: 0, lng: 0 });
        setDestination({ address: "", lat: 0, lng: 0 });
        setDate("");
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

  if (!user) {
    return (
      <div className="center-page">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold text-red-500 text-center mb-4">You must be logged in to book a ride</h1>
        </div>
        <div>
          <button
            className="red-button bg-blue-500 text-white p-2 rounded w-full"
            onClick={() => {
              onClose();
              router.push("/login");
            }}
          >
            Go to Login
          </button>
          <button className="red-button bg-gray-600 text-white p-2 rounded w-full mt-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-page">
      <h1 className="text-2xl font-bold text-red-500 text-right mb-4">Book a Ride</h1>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="\+?[0-9]{10,15}" // Supports international formats
              placeholder="Enter your phone number"
              className="p-3 border border-gray-700 rounded bg-gray-900 text-white max-w-sm w-full"
              required
            />
            <p className="text-gray-400 text-sm mt-1">Format: +1234567890 or 1234567890</p>
          </div>

          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />
          <LocationInput label="Drop-off Location" onSelect={(address, lat, lng) => setDestination({ address, lat, lng })} />

          <div>
            <label className="block text-lg font-semibold mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              required
            />
          </div>

          <button
            type="submit"
            className={`red-button bg-red-500 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          <button type="button" className="red-button bg-gray-600 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
