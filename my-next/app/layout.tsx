import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "TravelEase - Your Online Travel Agency",
  description: "Book accommodations and flights for your next trip",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">TravelEase</h1>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <Link href="/" className="text-gray-600 hover:text-gray-900">
                        Accommodations
                      </Link>
                    </li>
                    <li>
                      <Link href="/flights" className="text-gray-600 hover:text-gray-900">
                        Flights
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

