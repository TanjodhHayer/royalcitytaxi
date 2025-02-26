"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);  // No need for 'mounted' state anymore

  const images = [
    "/assets/royal-city-taxi.jpg",
    "/assets/Car_40.png",
    "/assets/taxivan1.jpg",
    "/assets/taxivan2.jpg",
    "/assets/taxivan3.jpg"
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="font-sans bg-gray-900">
      {/* Hero Section - First Screen */}
      <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/taxivan2.jpg')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-red-600 text-4xl md:text-6xl font-bold mb-4">ROYAL CITY TAXI</h1>
          <p className="text-2xl mt-4 font-semibold text-[#E57373] dark:text-[#F44336] mb-2 font-roboto">Serving New Westminster for over 100 years</p>
          <a href="/booking" className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-600 transition">BOOK TAXI ONLINE</a>
        </div>
      </div>
      
      {/* Welcome Section */}
      <div className="text-center py-12 bg-gray-900 text-white">
        <h1 className="text-5xl font-extrabold text-[#E57373] dark:text-[#F44336] mb-2 font-roboto">
          Welcome to Royal City Taxi
        </h1>
        <h2 className="text-2xl mt-4 font-semibold text-[#E57373] dark:text-[#F44336] mb-2 font-roboto">
          Serving New Westminster Area 24/7 for over 100+ years!
        </h2>
        <p className="text-lg mt-2 text-[#E0E0E0] font-roboto">
          New Westminster, Queensborough, East Richmond, Annacis Island, Burnaby, Coquitlam, Port Coquitlam, North Surrey, and YVR - Vancouver Airport.
        </p>
        <h1 className="text-xl mt-4 text-[#E57373] dark:text-[#F44336] font-roboto">
          Need a cab? Call 604-526-6666/604-521-6666 or Email dispatch@royalcitytaxi.com
        </h1>
      </div>

      {/* Meter Rates Section */}
      <div className="container mx-auto bg-gray-900">
        <section className="bg-gray-800 shadow-lg rounded-lg p-8 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-[#FFEB3B] mb-4 font-roboto">Meter Rates</h2>
          <p className="text-xl font-semibold text-[#F44336] dark:text-[#E57373] mb-2 font-roboto">
            <strong>Flag:</strong> $3.75
          </p>
          <p className="text-xl font-semibold text-[#F44336] dark:text-[#E57373] mb-2 font-roboto">
            <strong>Per km:</strong> $2.18
          </p>
          <p className="text-xl font-semibold text-[#F44336] dark:text-[#E57373] font-roboto">
            <strong>Waiting charge:</strong> $38.93 /hour
          </p>
        </section>
      </div>
      
      {/* Service Highlights */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <section className="relative bg-gray-900 text-white">
            <div className="max-w-5xl mx-auto text-center">
              <div className="relative">
                <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden rounded-lg">
                  <Image
                    src={images[currentIndex]}
                    alt="Royal City Taxi"
                    fill
                    style={{ objectFit: 'contain' }}  // Updated for objectFit
                    className="shadow-xl"
                  />
                </div>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-70 hover:opacity-100">&#8592;</button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full opacity-70 hover:opacity-100">&#8594;</button>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            <h3 className="text-3xl font-semibold">Reliable, Fast, and Professional Service</h3>
            <p className="text-lg">
              With over 100 years of experience, Royal City Taxi proudly provides fast and safe rides across New Westminster.
            </p>
            <p className="text-lg">
              Available 24/7 for airport transfers, business trips, and special events.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              We offer wheelchair-accessible rides, package deliveries, valet services, and jump-start assistance always on time, whenever you need us.
            </p>
          </div>

        </div>
      </section>

      {/* App Store and Google Play Links */}
      <section className="bg-gray-800 text-center text-white pb-16">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-4">Download Our App for Easy Booking</h2>
        <p className="text-lg text-gray-300 mb-8">Experience a hassle-free way to book your rides directly from your smartphone. Download our app and get started today!</p>
        <div className="flex justify-center gap-4">
          {/* App Store Image */}
          <a
            href="https://apps.apple.com/ca/developer/royal-city-taxi-ltd/id1467020082"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/appstore.png"
              alt="Download on App Store"
              width={301}
              height={59}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </a>
          
          {/* Google Play Image */}
          <a
            href="https://play.google.com/store/apps/details?id=com.taxicaller.RoyalCityTaxiLtd.app&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/googleplay.png"
              alt="Get it on Google Play"
              width={301}
              height={59}
              className="rounded-lg shadow-lg transition-transform transform hover:scale-105"
            />
          </a>
        </div>
      </section>

    </div>
  );
}
