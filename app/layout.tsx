import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Royal City Taxi",
  description: "Reliable and affordable taxi services in Westminster",
  icons: {
    icon: "/apple-touch-icon.png", // Change this to your logo's actual path
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center w-full">{children}</main>
      </body>
    </html>
  );
}
