import React from "react";
import Image from "next/image";
const ServicePage = () => {
  return (
    <div className="center-page">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Services</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        We provide reliable and affordable taxi services in the Royal City. Whether you need a quick ride to the airport or a comfortable trip across town, we've got you covered.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">Airport Transfers</h2>
          <p className="text-gray-600 mt-2">Get to and from the airport hassle-free.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">City Rides</h2>
          <p className="text-gray-600 mt-2">Fast and safe transportation within the city.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">Corporate Services</h2>
          <p className="text-gray-600 mt-2">Reliable transport for business professionals.</p>
        </div>
      </div>
      <Image
            src="/assets/apps.jpg"
            alt="Royal City Taxi Car"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
    </div>
  );
};

export default ServicePage;
