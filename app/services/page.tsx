"use client";
import Image from "next/image";

const ServicePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen pt-48">
      {/* Title and Introduction */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold text-customRed mb-6">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto px-2">
          At Royal City Taxi, we pride ourselves on providing reliable, safe, and affordable taxi services for all your transportation needs.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-16 px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Corporate & Event Accounts */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,1)]">
            <h2 className="text-2xl font-bold text-customRed mb-4">Corporate & Event Accounts</h2>
            <p className="text-lg text-gray-300 mb-4">
              We provide tailored solutions for corporate accounts and special events. Whether it&#39;s for employees or customers, we ensure comfortable, reliable, and safe transportation.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Book rides for your team, clients, or guests with ease, ensuring timely arrivals and departures every time. We specialize in managing large bookings for conferences, business meetings, and corporate events.
            </p>
            <p className="text-lg">
              <a
                href="tel:+16045266666"
                className="text-red-500 hover:text-red-400 font-bold"
              >
                Email us for more information&#39;s.
              </a>
            </p>
          </div>

          {/* Airport Transfers */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,1)]">
            <h2 className="text-2xl font-bold text-customRed mb-4">Airport Transfers</h2>
            <p className="text-lg text-gray-300 mb-4">
              Get to and from the airport quickly and stress-free. We offer both arrivals and departures services to ensure your travel is smooth. Our drivers track your flight to adjust for any delays or early arrivals.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Enjoy prompt pick-up and drop-off, with professional drivers who understand the importance of timely travel. Whether it&#39;s a domestic or international flight, we&#39;ve got you covered!
            </p>
            <p className="text-lg">
              <a
                href="tel:+16045266666"
                className="text-red-500 hover:text-red-400 font-bold"
              >
                Contact us for airport transfer bookings&#39;s.
              </a>
            </p>
          </div>

          {/* City Rides */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,1)]">
            <h2 className="text-2xl font-bold text-customRed mb-4">City Rides</h2>
            <p className="text-lg text-gray-300 mb-4">
              Whether you need a quick ride across town or a leisurely trip around the city, we offer fast and safe transportation to get you where you need to go. Our drivers know the city inside and out, so you can relax and enjoy the ride.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              From city tours to quick deliveries, our service ensures you&#39;re always on time and traveling in comfort. We also offer options for larger groups, with spacious vehicles to accommodate everyone.
            </p>
            <p className="text-lg text-gray-300 mb-4">
            We offer wheelchair accessible rides, cargo deliveries, valet services, and jump start assistance!
            </p>
            
            <p className="text-lg">
              <a
                href="tel:+16045266666"
                className="text-red-500 hover:text-red-400 font-bold"
              >
                Book your city ride now&#39;s.
              </a>
            </p>
          </div>

          {/* Corporate Services */}
          <div className="service-card bg-gray-800 p-8 rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,1)]">
            <h2 className="text-2xl font-bold text-customRed mb-4">Corporate Services</h2>
            <p className="text-lg text-gray-300 mb-4">
              We offer corporate packages that cater to businesses needing reliable transportation for employees and clients.
            </p>
            <p className="text-lg text-gray-300 mb-4">
              Whether it&#39;s for meetings, conferences, or daily commuting, our corporate services ensure a seamless and comfortable experience.
            </p>
            <p className="text-lg">
              <a
                href="tel:+16045266666"
                className="text-red-500 hover:text-red-400 font-bold"
              >
                Inquire about our corporate services&#39;s.
              </a>
            </p>
          </div>  
        </div>
      </section>

      {/* Image Section */}
      <section className="bg-gray-800 text-center text-white">
        <h2 className="text-3xl font-semibold text-customRed mb-4 py-4">Download Our App for Easy Booking</h2>
        <p className="text-lg text-gray-300 mb-8 px-2">Experience a hassle-free way to book your rides directly from your smartphone. Download our app and get started today!</p>
        {/* App Store and Google Play Links */}
        <div className="flex justify-center gap-4 pb-16">
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
};

export default ServicePage;
