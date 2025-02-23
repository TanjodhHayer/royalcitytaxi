"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/assets/Car_40_park.png",
    "/assets/taxivan1.jpg",
    "/assets/taxivan2.jpg",
    "/assets/taxivan3.jpg"
  ];

  // Handle image change when navigating manually
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Set up the automatic slideshow
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="font-sans bg-gray-900">
      {/* Welcome Section */}
      <div className="text-center py-12 bg-gray-900 text-white">
        <h1 className="text-5xl font-extrabold">Welcome to Royal City Taxi</h1>
        <h2 className="text-2xl mt-4 font-semibold">Serving New Westminster Area 24/7 for over 100+ years!</h2>
        <p className="text-lg mt-2">New Westminster, Queensborough, East Richmond, Annacis Island, Burnaby, Coquitlam, Port Coquitlam, North Surrey, and YVR - Vancouver Airport.</p>
        <h1 className="text-xl mt-4">Need a cab? Call 604-526-6666</h1>
      </div>

      {/* Meter Rates Section */}
      <div className="container mx-auto px-6 py-16 bg-gray-900">
        <section className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Meter Rates</h2>
          <p className="text-lg text-gray-700 mb-2"><strong>Flag:</strong> $3.75</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Per km:</strong> $2.18</p>
          <p className="text-lg text-gray-700"><strong>Waiting charge:</strong> $38.93 /hour</p>
        </section>
      </div>

      {/* Slideshow Section */}
      <section className="relative py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative">
            {/* Image wrapper with a fixed aspect ratio */}
            <div className="relative w-full h-[600px] overflow-hidden rounded-lg">
              <Image
                src={images[currentIndex]}
                alt="Royal City Taxi"
                layout="fill"
                objectFit="cover"
                className="shadow-xl"
              />
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-70 hover:opacity-100"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-70 hover:opacity-100"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/assets/royal-city-taxi.jpg"
            alt="Royal City Taxi Car"
            width={602}
            height={398}
            className="rounded-lg shadow-xl"
          />
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">Reliable, Fast, and Professional Service</h3>
            <p className="text-lg">With over 100 years of experience, Royal City Taxi is proud to provide fast and safe rides in the New Westminster area.</p>
            <p className="text-lg">24/7 service, including airport transfers, business trips, and special events.</p>
          </div>
        </div>
      </section>

      {/* App Store and Google Play Links */}
      <div className="py-16 px-6 bg-gray-900 text-center">
        <p className="text-xl mb-4 text-white">Download our app for easy bookings:</p>
        <div className="flex justify-center gap-4">
          <Image
            src="/assets/appstore.png"
            alt="Download on App Store"
            width={301}
            height={59}
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/assets/googleplay.png"
            alt="Get it on Google Play"
            width={301}
            height={59}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
