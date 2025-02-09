import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"; // Firebase authentication
import LocationInput from "../components/LocationInputs";
import { useRouter } from "next/navigation";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState({ address: "", lat: 0, lng: 0 });
  const [destination, setDestination] = useState({ address: "", lat: 0, lng: 0 });
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null); // Store current user state
  const router = useRouter(); // Use Next.js router

  // Check if the user is logged in when the modal is opened
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Get the currently authenticated user
    setUser(currentUser); // Set the user state when modal opens
  }, [isOpen]); // Depend on `isOpen` so it checks when modal opens

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
        setName("");
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

  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

// If the user is not logged in, show the login prompt
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
            onClose();  // Close the modal first
            router.push("/login");  // Redirect to login page
          }}
        >
          Go to Login
        </button>
        <button
          className="red-button bg-gray-600 text-white p-2 rounded w-full mt-2"
          onClick={onClose} // Close the modal and go back to home
        >
          Close
        </button>
      </div>
    </div>
  );
}

  // If the user is logged in, show the booking form
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
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              required
            />
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
        </form>
        
      </div>
      <button
              type="submit"
              className={`red-button bg-red-500 px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            <button
              type="button"
              className="red-button bg-gray-600 px-4 py-2 rounded"
              onClick={onClose} // Close the modal and go back to home
            >
              Cancel
            </button>
    </div>
  );
}
