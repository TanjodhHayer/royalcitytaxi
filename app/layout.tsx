import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Script from "next/script"; 

import { AuthProvider } from "./context/AuthContext";



export const metadata: Metadata = {
  title: "Royal City Taxi",
  description: "Reliable and affordable taxi services in Westminster",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        
        <Script
          strategy="lazyOnload"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
      </head>
      
      <body className="text-gray-900 flex flex-col min-h-screen">
        
        <AuthProvider>  
          <Navbar />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
