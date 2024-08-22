import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GameDay Passport | Your Global Sports Guide",
  description: "Access worldwide sports schedules, streaming options, and viewing guides. Never miss a game with GameDay Passport.",
  keywords: "sports, schedules, streaming, global sports, time converter",
  openGraph: {
    title: "GameDay Passport | Your Global Sports Guide",
    description: "Access worldwide sports schedules, streaming options, and viewing guides.",
    images: [{ url: "/og-image.jpg" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto px-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">GameDay Passport</Link>
              <ul className="flex space-x-4">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} GameDay Passport. All rights reserved.</p>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}