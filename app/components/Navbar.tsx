"use client";
import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Royal City Taxi</h1>
        <Image src="/assets/logo.png" alt="Royal City Taxi Logo" width={150} height={50} />
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/booking">Book a Ride</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
