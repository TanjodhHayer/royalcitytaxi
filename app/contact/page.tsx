"use client";

import { useState } from "react";
import Image from "next/image";

  export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      alert("Message sent! We will get back to you soon.");
    };



    return (
      <div className="center-page">
        <div className="w-[90%] max-w-2xl bg-gray-900 text-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-red-500 text-center mb-6">Contact Us</h1>
  
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Contact Info */}
            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <p className="text-lg font-semibold">📍 New Westminster, BC</p>
              <p className="text-lg font-semibold">
                📞 Call Us:{" "}
                <a href="tel:6045266666" className="text-red-500 hover:text-red-400">
                  (604) 526-6666
                </a>
              </p>
              <p className="text-lg font-semibold">
                📧 Email:{" "}
                <a href="mailto:dispatch@royalcitytaxi.com" className="text-red-500 hover:text-red-400">
                  dispatch@royalcitytaxi.com
                </a>
              </p>
            </div>
  
            {/* Responsive Contact Form */}
            <form className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-3 border border-gray-700 rounded bg-gray-900 text-white max-w-sm w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Email</label>
                <input
                  type="email"
                  className="p-3 border border-gray-700 rounded bg-gray-900 text-white max-w-sm w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
                <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  pattern="[0-9]{10}" // Ensures a 10-digit phone number (optional)
                  placeholder="Enter your phone number"
                  className="p-3 border border-gray-700 rounded bg-gray-900 text-white max-w-sm w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-1">Message</label>
                <textarea
                  className="p-3 border border-gray-700 rounded bg-gray-900 text-white h-32 max-w-sm w-full"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  