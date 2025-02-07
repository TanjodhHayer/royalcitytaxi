import Image from "next/image";

export default function Home() {
  return (
    <div className="center-page">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-yellow-400">
          Welcome to Royal City Taxi
        </h1>
        <h2>Call 604-526-6666</h2> 
        <p className="text-lg text-gray-300 mt-4 max-w-2xl">
          Serving all of New Westminster, Queensborough, East Richmond, Annacis Island, Burnaby, Coquitlam, Port Coquitlam, North Surrey,and YVR - Vancouver Airport.
        </p>
      </section>

      {/* Service Highlights */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/assets/royal-city-taxi.jpg"
            alt="Royal City Taxi Car"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
          <div className="text-left">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Reliable & Comfortable Rides
            </h2>
            <p className="text-lg text-gray-300">
              Our fleet includes taxi-vans for large groups, and mobility
              accommodation is ready to pick you up at a moment's notice.
            </p>
          </div>
        </div>
        {/* Corporate Accounts Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Corporate & Event Accounts</h2>
          <p className="text-lg">We provide accounts for corporate and special events.</p>
          <p className="text-lg">Provide your staff and customers a safe and secure ride.</p>
          <p className="text-lg mt-2">
            <strong>Email our manager today at</strong>  
            <a href="mailto:manager@royalcitytaxi.com" className="text-red-500 hover:text-red-400 ml-1">
              manager@royalcitytaxi.com
            </a>  
            <strong> for more information.</strong>
          </p>
        </div>
        {/* Meter Rates Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Our Meter Rates</h2>
          <p className="text-lg"><strong>Flag:</strong> $3.75</p>
          <p className="text-lg"><strong>Per km:</strong> $2.18</p>
          <p className="text-lg"><strong>Waiting charge:</strong> $38.93 /hour</p>
        </div>
        <Image
            src="/assets/apps.jpg"
            alt="Royal City Taxi Car"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
      </section>
    </div>
  );
}
