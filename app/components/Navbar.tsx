"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // ✅ Use global auth
import BookingModal from "../booking/BookingModal";
import { checkIfAdmin } from "@/lib/firebase"; // Import the helper to check for admin role

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { user, loading } = useAuth(); // ✅ Get user from AuthContext
  const [isAdmin, setIsAdmin] = useState(false); // State to store admin role
  const router = useRouter();
  const auth = getAuth();

  // Function to handle sign out
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.reload();
      router.push("/"); // Redirect home after logout
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check if the user is an admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const adminStatus = await checkIfAdmin();
        setIsAdmin(adminStatus); // Set admin role status
      }
    };
    checkAdminRole();
  }, [user]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Image src="/assets/logo.png" alt="Logo" width={250} height={250} />

          {!isMobile && (
            <div className="navbar-links">
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} className="text-white hover:text-gray-300 transition">Book a Ride</a>
              <a href="/contact">Contact</a>

              {/* ✅ Show admin pages if user is an admin */}
              {isAdmin && (
              <>
                <a href="/ViewBookings" className="text-white hover:text-gray-300 transition">View Bookings</a>
                <a href="/ViewMessages" className="text-white hover:text-gray-300 transition">View Contact Messages</a>
              </>
              )}

              {/* ✅ Show "Login" if no user, otherwise "Sign Out" */}
              {!loading && (
                user ? (
                  <a href="#" onClick={handleSignOut} className="text-white hover:text-gray-300 transition">Sign Out</a>
                ) : (
                  <a href="/login" className="text-white hover:text-gray-300 transition">Login</a>
                )
              )}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="red">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="navbar-links-vertical">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} className="text-white hover:text-gray-300 transition">Book a Ride</a>
            <a href="/contact">Contact</a>

            {/* ✅ Show admin pages if user is an admin */}
            {isAdmin && (
              <>
                <a href="/ViewBookings" className="text-white hover:text-gray-300 transition">View Bookings</a>
                <a href="/ViewMessages" className="text-white hover:text-gray-300 transition">View Contact Messages</a>
              </>
            )}

            {/* ✅ Show "Login" or "Sign Out" dynamically */}
            {!loading && (
              user ? (
                <a href="#" onClick={handleSignOut} className="text-white hover:text-gray-300 transition">Sign Out</a>
              ) : (
                <a href="/login" className="text-white hover:text-gray-300 transition">Login</a>
              )
            )}
          </div>
        )}
      </nav>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
