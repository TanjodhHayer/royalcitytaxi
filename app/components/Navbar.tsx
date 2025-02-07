"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import BookingModal from "../booking/BookingModal"; // Import the modal

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false); // State for modal

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Image src="/assets/logo.png" alt="Royal City Taxi Logo" width={250} height={250} />

          {!isMobile && (
            <div className="navbar-links">
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} className="text-white hover:text-gray-300 transition">Book a Ride</a>

              <a href="/contact">Contact</a>
            </div>
          )}

          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="navbar-links-vertical">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <button onClick={() => setIsBookingOpen(true)} className="bg-red-500 px-4 py-2 rounded text-white">
              Book a Ride
            </button>
            <a href="/contact">Contact</a>
          </div>
        )}
      </nav>

      {/* Render Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
