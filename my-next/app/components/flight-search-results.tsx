"use client"

import { useState, useEffect } from "react"
import { Plane, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockFlights = [
  {
    id: 1,
    airline: "Biman Bangladesh Airlines",
    logo: "/biman-bangladesh-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Jeddah (JED)",
    departureTime: "01:00",
    arrivalTime: "05:30",
    duration: "6h 30m",
    price: 650,
  },
  {
    id: 2,
    airline: "Saudi Arabian Airlines",
    logo: "/saudi-arabian-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Jeddah (JED)",
    departureTime: "03:30",
    arrivalTime: "08:00",
    duration: "6h 30m",
    price: 700,
  },
  {
    id: 3,
    airline: "Biman Bangladesh Airlines",
    logo: "/biman-bangladesh-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Medina (MED)",
    departureTime: "22:00",
    arrivalTime: "02:30",
    duration: "6h 30m",
    price: 600,
  },
  {
    id: 4,
    airline: "Saudi Arabian Airlines",
    logo: "/saudi-arabian-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Medina (MED)",
    departureTime: "20:30",
    arrivalTime: "01:00",
    duration: "6h 30m",
    price: 680,
  },
  {
    id: 5,
    airline: "Biman Bangladesh Airlines",
    logo: "/biman-bangladesh-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Cox's Bazar (CXB)",
    departureTime: "09:00",
    arrivalTime: "10:00",
    duration: "1h 00m",
    price: 120,
  },
  {
    id: 6,
    airline: "Novoair",
    logo: "/novoair-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Cox's Bazar (CXB)",
    departureTime: "11:30",
    arrivalTime: "12:30",
    duration: "1h 00m",
    price: 110,
  },
  {
    id: 7,
    airline: "US-Bangla Airlines",
    logo: "/us-bangla-airlines-logo.svg",
    origin: "Dhaka (DAC)",
    destination: "Cox's Bazar (CXB)",
    departureTime: "14:00",
    arrivalTime: "15:00",
    duration: "1h 00m",
    price: 115,
  },
]

interface FlightSearchResultsProps {
  origin: string
  destination: string
}

export default function FlightSearchResults({ origin, destination }: FlightSearchResultsProps) {
  const [sortBy, setSortBy] = useState("price")
  const [filteredFlights, setFilteredFlights] = useState(mockFlights)

  useEffect(() => {
    const filtered = mockFlights.filter(
      (flight) =>
        flight.origin.toLowerCase().includes(origin.toLowerCase()) &&
        flight.destination.toLowerCase().includes(destination.toLowerCase()),
    )
    setFilteredFlights(filtered)
  }, [origin, destination])

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "duration") return a.duration.localeCompare(b.duration)
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Flights</h2>
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="duration">Duration: Shortest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {sortedFlights.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No flights found for the selected route.</p>
      ) : (
        <div className="space-y-4">
          {sortedFlights.map((flight) => (
            <Card key={flight.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img src={flight.logo || "/placeholder.svg"} alt={flight.airline} className="w-8 h-8 mr-2" />
                  {flight.airline}
                </CardTitle>
                <CardDescription>
                  {flight.origin} to {flight.destination}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Plane className="h-5 w-5 text-blue-500 mr-2" />
                    <span>
                      {flight.departureTime} - {flight.arrivalTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-500 mr-2" />
                    <span>{flight.duration}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold">${flight.price}</span>
                <Button>Select</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

