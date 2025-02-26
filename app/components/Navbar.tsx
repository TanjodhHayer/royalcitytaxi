"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { checkIfAdmin } from "@/lib/firebase";
import debounce from "lodash.debounce";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Track scroll position
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const auth = getAuth();

  // Detect scroll to update navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Set true if scrolled down 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        setIsAdmin(adminStatus);
      }
    };
    checkAdminRole();
  }, [user]);

  // Sign out function
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.reload();
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false); // Close the menu when a mobile link is clicked
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all hover:text-red-500 duration-300 ${
          isScrolled ? "bg-gray-200 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="navbar-container flex items-center justify-between px-4 py-3">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="h-auto w-auto"
          />

          {!isMobile && (
            <div className="flex space-x-6">
              {["Home", "Services", "Book a Ride", "Contact"].map((text, index) => (
                <Link 
                  key={index} 
                  href={
                    text.toLowerCase() === "home" ? "/" :
                    text === "Book a Ride" ? "/booking" :
                    `/${text.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  className={`text-lg font-medium transition-all ${
                    isScrolled ? "text-black hover:text-red-500" : "text-white hover:text-red-500"
                  }`}
                >
                  {text}
                </Link>
              ))}

              {isAdmin && (
                <>
                  <Link href="/ViewBookings" className={`text-lg font-medium transition-all ${isScrolled ? "text-black hover:text-red-500" : "text-white hover:text-red-500"}`}>
                    View Bookings
                  </Link>
                  <Link href="/ViewMessages" className={`text-lg font-medium transition-all ${isScrolled ? "text-black hover:text-red-500" : "text-white hover:text-red-500"}`}>
                    View Messages
                  </Link>
                </>
              )}

              {!loading && (
                user ? (
                  <button onClick={handleSignOut} className={`text-lg font-medium transition-all ${isScrolled ? "text-black hover:text-red-500" : "text-white hover:text-red-500"}`}>
                    Sign Out
                  </button>
                ) : (
                  <Link href="/login" className={`text-lg font-medium transition-all ${isScrolled ? "text-black hover:text-red-500" : "text-white hover:text-red-500"}`}>
                    Login
                  </Link>
                )
              )}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setIsOpen(!isOpen)} className="ml-auto mr-4 p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition duration-200 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="flex flex-col items-center space-y-4 bg-gray-900">
            {["Home", "Services", "Book a Ride", "Contact"].map((text, index) => (
              <Link 
                key={index} 
                href={
                  text.toLowerCase() === "home" ? "/" :
                  text === "Book a Ride" ? "/booking" :
                  `/${text.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={`text-lg font-medium transition-all text-white hover:text-red-500`}
                onClick={handleLinkClick} // Close menu when a link is clicked
              >
                {text}
              </Link>
            ))}

            {isAdmin && (
              <>
                <Link href="/ViewBookings" className="text-lg font-medium transition-all text-white hover:text-red-500" onClick={handleLinkClick}>
                  View Bookings
                </Link>
                <Link href="/ViewMessages" className="text-lg font-medium transition-all text-white hover:text-red-500" onClick={handleLinkClick}>
                  View Messages
                </Link>
              </>
            )}

            {!loading && (
              user ? (
                <button onClick={handleSignOut} className="text-lg font-medium transition-all text-white hover:text-red-500">
                  Sign Out
                </button>
              ) : (
                <Link href="/login" className="text-lg font-medium transition-all text-white hover:text-red-500" onClick={handleLinkClick}>
                  Login
                </Link>
              )
            )}
          </div>
        )}
      </nav>
    </>
  );
}
