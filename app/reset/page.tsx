"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail, auth } from "@/lib/firebase"; // Import from your firebase module

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link has been sent to your email.");
    } catch (error) {
      setMessage("Error: Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 bg-red-600 hover:bg-red-500 rounded-md text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-lg text-center text-gray-300">
            {message}
          </div>
        )}

        {/* Add the button to navigate back to the login page */}
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/login")}
            className="text-red-500 hover:text-red-400"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
