"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); 

  const images = [
    "/assets/royal-city-taxi.jpg",
    "/assets/Car_40.png",
    "/assets/taxivan1.jpg",
    "/assets/taxivan2.jpg",
    "/assets/taxivan3.jpg",
    "/assets/taxivan4.jpg"
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 pb-42">
        <Image
              src="/assets/crown.png"
              alt="Logo"
              width={150}
              height={150}
              className="h-auto w-auto"
            />
          <p className="text-2xl mt-0 font-semibold text-customRed dark:text-customRed mb-4 font-roboto">Serving New Westminster since 1941</p>
          <p className="text-2xl mt-0 font-semibold text-customRed dark:text-customRed mb-4 font-roboto"><a href="tel:+16045266666">Call 604-526-6666 </a></p>
          
      
          <a href="/booking" className="bg-customRed text-black px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-red-600 transition">BOOK A TAXI ONLINE</a>

          <div className="absolute bottom-8 w-full flex justify-center gap-4 z-10">
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
        </div>
      </div>
      
      {/* Welcome Section */}
      <div className="text-center py-12 bg-gray-900 text-white">
        <h1 className="text-5xl font-extrabold text-customRed dark:text-customRed mb-2 font-roboto">
        <a href="tel:+16045266666">Need a cab?  Call 604-526-6666 </a>
        </h1>
        <p className="text-lg mt-2 text-[#E0E0E0] font-roboto">
          Serving New Westminster, Queensborough, East Richmond, Annacis Island, Burnaby, Coquitlam, North Surrey, and YVR - Vancouver Airport.
        </p>
      </div>

      {/* Meter Rates Section */}
      <div className="container mx-auto bg-gray-900">
        <section className="bg-gray-800 shadow-lg rounded-lg p-8 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-extrabold text-customRed mb-4 font-roboto">Meter Rates for Car & Van</h2>
          <p className="text-xl text-white dark:text-white ">
           Flag:$3.75
          </p>
          <p className="text-xl text-white dark:text-white ">
            Per km:$2.18
          </p>
          <p className="text-xl text-white dark:text-white ">
            Waiting charge: $38.93 /hour
          </p>
          <p className="text-xl mt-2 text-white dark:text-white ">
            Rates are different for cargo, contact us for inquiries!
          </p>
        </section>
      </div>
      
      {/* Service Highlights */}
      <section className="bg-gray-900 text-white pt-6 pb-6">
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
            <h3 className="text-2xl font-semibold px-4">Reliable, Fast, and Professional Service</h3>
            <p className="text-lg px-4">
              Royal City Taxi proudly provides rides across New Westminster in our fleet of sedans and vans along with wheelchair-accessible vans.
            </p>
            <p className="text-lg px-4">
              Pre-booking available 24/7 for airport transfers, business trips, special events, cargo deliveries, valet services, and jump-start assistance.
            </p>
            <p className="text-lg px-4">
              Always on time, whenever you need us!
            </p>
          </div>

        </div>
      </section>

      {/* App Store and Google Play Links */}
      <section className="bg-gray-800 text-center text-white pb-16">
        <h2 className="text-3xl font-semibold text-customRed mb-4 py-4">Download Our App for Easy Booking</h2>
        <p className="text-lg text-gray-300 mb-8 px-2">Experience a hassle-free way to book your rides directly from your smartphone. Download our app and get started today!</p>
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
