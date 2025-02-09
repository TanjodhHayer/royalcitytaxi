"use client";
import React from "react";
import Image from "next/image";

const ServicePage = () => {
  return (
    <div className="center-page">
      {/* Title and Introduction */}
      
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Services</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We provide reliable and affordable taxi services in the Royal City. Whether you need a quick ride to the airport or a comfortable trip across town, we've got you covered.
        </p>
      

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        
        {/* Corporate & Event Accounts */}
        <div className="service-card bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Corporate & Event Accounts</h2>
          <p className="text-lg text-gray-300 mb-4">We provide accounts for corporate and special events.</p>
          <p className="text-lg text-gray-300 mb-4">Provide your staff and customers a safe and secure ride.</p>
          <p className="text-lg">
            <a
              href="mailto:manager@royalcitytaxi.com"
              className="text-red-500 hover:text-red-400 font-bold"
            >
              Email our manager today at manager@royalcitytaxi.com for more information.
            </a>
          </p>
        </div>

        {/* Airport Transfers */}
        <div className="service-card bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Airport Transfers</h2>
          <p className="text-gray-300">Get to and from the airport hassle-free.</p>
        </div>

        {/* City Rides */}
        <div className="service-card bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">City Rides</h2>
          <p className="text-gray-300">Fast and safe transportation within the city.</p>
        </div>

        {/* Corporate Services */}
        <div className="service-card bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Corporate Services</h2>
          <p className="text-gray-300">Reliable transport for business professionals.</p>
        </div>
        
      </div>

      {/* Image Section */}
      <div className="mt-16 text-center">
        <Image
          src="/assets/apps.jpg"
          alt="Royal City Taxi"
          width={600}
          height={400}
          className="rounded-lg shadow-md mx-auto"
        />
      </div>
    </div>
  );
};

export default ServicePage;
