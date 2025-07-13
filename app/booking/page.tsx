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

// Fare constants
const FLAG_RATE = 3.75; // base charge
const PER_KM_RATE = 2.18; // per km charge
const AIRPORT_KEYWORDS = [
  "airport",
  "3211 grant mcconachie wy",
  "vancouver international airport",
  "vancouver airport",
  "yvr", 
  "yvr airport", 
  "grant mcconachie", 
  "richmond airport",
  "3211 Grant McConachie Wy, Richmond, BC V7B 0A4, Canada"
].map(k => k.toLowerCase());




// Use Google Maps Distance Matrix API to get driving distance in km
function getDrivingDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<number> {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      reject("Google Maps API not loaded");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status !== "OK") {
          reject(`DistanceMatrixService error: ${status}`);
          return;
        }

        if (!response) {
          reject("DistanceMatrixService returned null response");
          return;
        }

        const element = response.rows?.[0]?.elements?.[0];
        if (!element) {
          reject("DistanceMatrixService response missing elements");
          return;
        }

        if (element.status !== "OK") {
          reject(`Element error: ${element.status}`);
          return;
        }

        // distance.value is in meters
        const distanceInKm = element.distance.value / 1000;
        resolve(distanceInKm);
      }
    );
  });
}


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
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [showAirportPopup, setShowAirportPopup] = useState(false);
  const [destinationInput, setDestinationInput] = useState(""); // NEW
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const showBookingToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };
  
  const router = useRouter();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Calculate estimated fare whenever pickup or destination changes
  useEffect(() => {
    if (pickup.lat !== 0 && destination.lat !== 0) {
      getDrivingDistance(pickup, destination)
        .then((distanceKm) => {
          const fare = FLAG_RATE + PER_KM_RATE * distanceKm;
          setEstimatedFare(Math.ceil(fare));
          // Airport detection (simple keyword check)
          const lowerDest = destination.address.toLowerCase();
          const isAirportMatch = AIRPORT_KEYWORDS.some(keyword => lowerDest.includes(keyword));
          setShowAirportPopup(isAirportMatch);
        })
        .catch((err) => {
          console.error("Failed to calculate driving distance:", err);
          setEstimatedFare(null);
        });
    } else {
      setEstimatedFare(null);
    }
  }, [pickup, destination]);

  useEffect(() => {
    // Only run if user typed something in drop-off field
    if (!destinationInput) {
      setShowAirportPopup(false);
      return;
    }
  
    const lowerInput = destinationInput.toLowerCase();
    const matchesAirport = AIRPORT_KEYWORDS.some(keyword => lowerInput.includes(keyword));
  
    setShowAirportPopup(matchesAirport);
  }, [destinationInput]);
  
  // Convert 24-hour time to 12-hour time format (AM/PM)
  const formatTimeTo12Hour = (time: string) => {
    const [hours, minutes] = time.split(":");
    let hoursInt = parseInt(hours);
    const ampm = hoursInt >= 12 ? "PM" : "AM";
    hoursInt = hoursInt % 12;
    hoursInt = hoursInt ? hoursInt : 12;
    return `${hoursInt}:${minutes} ${ampm}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formattedTime = formatTimeTo12Hour(time);

    const bookingData = {
      name,
      email,
      phone,
      pickup,
      destination,
      pickupAddress: pickup.address || "",
      destinationAddress: destination.address || "",
      date: date ? date.toISOString().split("T")[0] : "",
      time: formattedTime,
      createdAt: new Date(),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const emailResponse = await fetch("/api/sendBookingEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (emailResponse.ok) {
          showBookingToast(`Booking confirmed for ${name}!`);
          setName("");
          setEmail("");
          setPhone("");
          setPickup({ address: "", lat: 0, lng: 0 });
          setDestination({ address: "", lat: 0, lng: 0 });
          setDate(null);
          setTime("");
          setEstimatedFare(null);
        } else {
          showBookingToast("Failed to send booking email!");
        }
      } else {
        showBookingToast("Failed to send booking email!");
      }
    } catch (error) {
      console.error("Error submitting booking or sending email:", error);
      showBookingToast("An error occurred. Please try again.");
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
        <button
          className="mt-4 bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-500"
          onClick={() => router.push("/")}
        >
          Go to Home
        </button>
        <button
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-400"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center bg-gray-900 text-white px-6 py-12">
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-customRed text-white px-6 py-3 rounded-lg shadow-lg z-50 select-none pointer-events-none animate-fade-in-out">
          {toastMessage}
        </div>
      )}

      <h1 className="text-4xl font-bold text-customRed mb-6">Book a Ride</h1>
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
              const value = e.target.value.replace(/[^0-9-]/g, "");
              setPhone(value);
            }}
            placeholder="Enter your phone number"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
            required
          />

          <LocationInput label="Pickup Location" onSelect={(address, lat, lng) => setPickup({ address, lat, lng })} />
          


          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-gray-500 text-xl" />
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
          
          <LocationInput
            label="Drop-off Location"
            onSelect={(address, lat, lng) => setDestination({ address, lat, lng })}
            onInputChange={(value) => setDestinationInput(value)} // 👈 track raw input
          />

          {showAirportPopup && (
            <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg text-sm">
              ✈️ You're headed to the airport! Mention this to your driver to receive a <strong>10% discount</strong> on your fare.
            </div>
          )}


          
          {/* Estimated Fare Display */}
          {estimatedFare !== null && (
            <div className="text-lg text-customRed font-semibold text-center mt-2">
              Estimated Fare: ${estimatedFare} CAD
              <p className="text-sm text-gray-400 mt-1 italic">
                * Final fare may vary depending on traffic and route conditions.
              </p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full bg-customRed px-4 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition flex justify-center items-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
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
