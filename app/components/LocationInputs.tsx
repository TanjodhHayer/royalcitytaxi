"use client";
import { useEffect, useRef, useState } from "react";

interface LocationInputProps {
  label: string;
  onSelect: (address: string, lat: number, lng: number) => void;
}

export default function LocationInput({ label, onSelect }: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [manualAddress, setManualAddress] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      if (inputRef.current && !autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.geometry) {
            onSelect(
              place.formatted_address || "",
              place.geometry.location?.lat() || 0,
              place.geometry.location?.lng() || 0
            );
            setManualAddress(place.formatted_address || ""); // Keep UI updated
          }
        });
      }
    }
  }, [onSelect]);

  // Handle manual typing (if Google Autocomplete is down)
  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualAddress(e.target.value);
    onSelect(e.target.value, 0, 0); // Set lat/lng to 0 since we don’t have real values
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-1">{label}</label>
      <input
        ref={inputRef}
        type="text"
        value={manualAddress}
        onChange={handleManualInput} // Allow manual typing
        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
        placeholder="Enter location"
      />
    </div>
  );
}
