"use client"

import type React from "react"

import { useState } from "react"
import { Plane, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface FlightSearchFormProps {
  onSearch: (origin: string, destination: string) => void
}

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(origin, destination)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Label htmlFor="origin">Origin</Label>
          <Input
            id="origin"
            type="text"
            placeholder="From where?"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="pl-10"
          />
          <Plane className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            type="text"
            placeholder="To where?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10"
          />
          <Plane className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div>
          <Label htmlFor="departure-date">Departure</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {departureDate ? departureDate.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="return-date">Return</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {returnDate ? returnDate.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <Label htmlFor="passengers">Passengers</Label>
          <Input
            id="passengers"
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(Number.parseInt(e.target.value))}
            className="pl-10"
          />
          <Users className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button type="submit" className="w-full mt-4">
        Search Flights
      </Button>
    </form>
  )
}

