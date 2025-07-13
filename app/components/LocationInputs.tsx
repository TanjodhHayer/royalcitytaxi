"use client";
import { useEffect, useRef, useState } from "react";

interface LocationInputProps {
  label: string;
  onSelect: (address: string, lat: number, lng: number) => void;
  onInputChange?: (value: string) => void;  // optional callback
}

export default function LocationInput({ label, onSelect, onInputChange }: LocationInputProps) {
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
            const address = place.formatted_address || "";
            const lat = place.geometry.location?.lat() || 0;
            const lng = place.geometry.location?.lng() || 0;

            setManualAddress(address);
            onSelect(address, lat, lng);
          }
        });
      }
    }
  }, [onSelect]);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setManualAddress(val);
    if (onInputChange) onInputChange(val);
  };

  return (
    <div>
      <label className="block text-lg font-semibold mb-1">
        {label}
        <span className="block text-sm text-gray-400 mt-1 ml-0">
          (Select an address from the suggestions for accurate fare estimate)
        </span>
      </label>
      <input
        ref={inputRef}
        type="text"
        value={manualAddress}
        onChange={handleManualInput}
        className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
        placeholder="Enter location"
      />
    </div>
  );
}
