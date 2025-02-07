
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width to determine when to switch to mobile menu
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Switch to mobile menu if screen width is < 768px
    };
    checkScreenSize(); // Run on mount
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Image src="/assets/logo.png" alt="Royal City Taxi Logo" width={250} height={250} />

        {/* Desktop Navbar - Only Visible When `isMobile === false` */}
        {!isMobile && (
          <div className="navbar-links">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/booking">Book a Ride</a>
            <a href="/contact">Contact</a>
        </div>
        )}

        {/* Mobile Menu Button - Only Visible When `isMobile === true` */}
        {isMobile && (
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu - Only Shows When `isOpen === true` */}
      {isMobile && isOpen && (
        <div className="navbar-links-vertical">
          <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/booking">Book a Ride</a>
            <a href="/contact">Contact</a>
        </div>
      )}
    </nav>
  );
}
