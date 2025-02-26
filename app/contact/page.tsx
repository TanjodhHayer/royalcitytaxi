"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Message sent! We will get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const result = await response.json();
        setError(result.error || "Failed to send the message.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white  pt-32">
      <h1 className="text-4xl font-bold text-red-500 mb-6">Contact Us</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
        {/* Contact Info */}
        <div className="space-y-4 text-center mb-6">
        <p className="text-lg text-gray-300 mb-4">
          Have a question? Need more information? 
        </p>
        <p className="text-lg text-gray-300 mb-4">
          Reach out to us via email or phone, and we’ll get back to you promptly.
        </p>
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

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10}"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-red-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Enter your message"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white h-32 focus:ring-2 focus:ring-red-500"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Success/Error Messages */}
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button with Loading */}
          <button
            type="submit"
            className={`w-full bg-red-500 px-4 py-3 rounded-lg text-white text-lg font-semibold hover:bg-red-600 transition flex justify-center items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
      
    </div>
  );
}
