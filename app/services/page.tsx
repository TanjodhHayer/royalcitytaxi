"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import BookingModal from "../booking/BookingModal";

const ServicePage = () => {

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookingClick = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevents the default link behavior
    setIsBookingOpen(true);  // Opens the booking form (modal)
  };
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Title and Introduction */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          At Royal City Taxi, we pride ourselves on providing reliable, safe, and affordable taxi services for all your transportation needs. From corporate accounts to airport transfers, we’ve got you covered.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Corporate & Event Accounts */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Corporate & Event Accounts</h2>
            <p className="text-lg text-gray-300 mb-4">
              We provide tailored solutions for corporate accounts and special events. Whether it’s for employees or customers, we ensure comfortable, reliable, and safe transportation.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Book rides for your team, clients, or guests with ease, ensuring timely arrivals and departures every time.
            </p>
            <p className="text-lg">
            <a
              href="tel:+16045266666"
              className="text-red-500 hover:text-red-400 font-bold"
            >
                Email us for more information.
              </a>
            </p>
          </div>

          {/* Airport Transfers */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Airport Transfers</h2>
            <p className="text-lg text-gray-300 mb-4">
              Get to and from the airport quickly and stress-free. We offer both arrivals and departures services to ensure your travel is smooth.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Enjoy prompt pick-up and drop-off, with professional drivers who understand the importance of timely travel.
            </p>
            <p className="text-lg">
            <a
              href="tel:+16045266666"
              className="text-red-500 hover:text-red-400 font-bold"
            >
              Contact us for airport transfer bookings.
            </a>

            </p>
          </div>

          {/* City Rides */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">City Rides</h2>
            <p className="text-lg text-gray-300 mb-4">
              Whether you need a quick ride across town or a leisurely trip around the city, we offer fast and safe transportation to get you where you need to go.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Our drivers know the city like the back of their hand, ensuring the most efficient route every time.
            </p>
            <p className="text-lg">
            <a
              href="tel:+16045266666"
              className="text-red-500 hover:text-red-400 font-bold"
            >
                Book your city ride now.</a>
              
            </p>
          </div>
          

          {/* Corporate Services */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Corporate Services</h2>
            <p className="text-lg text-gray-300 mb-4">
              We offer corporate packages that cater to businesses needing reliable transportation for employees and clients.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Whether it's for meetings, conferences, or daily commuting, our corporate services ensure a seamless and comfortable experience.
            </p>
            <p className="text-lg">
            <a
              href="tel:+16045266666"
              className="text-red-500 hover:text-red-400 font-bold"
            >
                Inquire about our corporate services.
              </a>
            </p>
          </div>
          
        </div>
      </section>

      {/* Image Section */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Download Our App for Easy Booking</h2>
        <p className="text-lg text-gray-300 mb-8">Experience a hassle-free way to book your rides directly from your smartphone. Download our app and get started today!</p>
        <Image
          src="/assets/apps.jpg"
          alt="Royal City Taxi App"
          width={600}
          height={400}
          className="rounded-lg shadow-md mx-auto"
        />
      </section>

      {/* Contact Section */}
      <section className="bg-gray-800 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Get in Touch with Us</h2>
        <p className="text-lg text-gray-300 mb-4">
          Have a question? Need more information? We’re here to help. Reach out to us via email or phone, and we’ll get back to you promptly.
        </p>
        <p className="text-lg text-gray-300">
        <a
              href="tel:+16045266666"
              className="text-red-500 hover:text-red-400 font-bold"
            >
            info@royalcitytaxi.com
          </a>
        </p>
      </section>
      
    </div>
    
  );
  
};


export default ServicePage;
