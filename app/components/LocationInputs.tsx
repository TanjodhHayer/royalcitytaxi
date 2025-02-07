"use client";
import { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface LocationInputProps {
  label: string;
  onSelect: (address: string, lat: number, lng: number) => void;
}

export default function LocationInput({ label, onSelect }: LocationInputProps) {
  const [inputValue, setInputValue] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.formatted_address && place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setInputValue(place.formatted_address);
          onSelect(place.formatted_address, lat, lng); 
        }
      });
    }
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-1">{label}</label>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-700 rounded bg-gray-900 text-white"
          placeholder="Start typing..."
        />
      </Autocomplete>
    </div>
  );
}
