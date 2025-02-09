import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="welcome">
        <h1 className="text-4xl font-bold">
          Welcome to Royal City Taxi
        </h1>
        <h2 className="serving ">Serving Greater Vancouver Area 24/7 for over 10+ years!</h2>
        <h2 className="">New Westminster, Queensborough, East Richmond, Annacis  Island, Burnaby, Coquitlam, Port Coquitlam, North Surrey, and YVR -  Vancouver Airport.</h2>
        <h1>Need a cab? Call 604-526-6666</h1> 
      </div>
        <div className="container section">
          {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 py-20">
        {/* Meter Rates Section */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Meter Rates</h2>
          <p className="text-lg"><strong>Flag:</strong> $3.75</p>
          <p className="text-lg"><strong>Per km:</strong> $2.18</p>
          <p className="text-lg"><strong>Waiting charge:</strong> $38.93 /hour</p>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <Image
            src="/assets/royal-city-taxi.jpg"
            alt="Royal City Taxi Car"
            width={602}
            height={398}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
      <div className="section"></div>
      <div className="section">
      <Image
            src="/assets/appstore.png"
            alt="Royal City Taxi Car"
            width={301}
            height={59}
            className="rounded-lg shadow-md"
          />
          <Image
            src="/assets/googleplay.png"
            alt="Royal City Taxi Car"
            width={301}
            height={59}
            className="rounded-lg shadow-md"
          />
      </div>
      </div>
      
      
    </div>
  );
}
