"use client"

import type React from "react"

import { useState } from "react"
import { Search, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function SearchForm() {
  const [destination, setDestination] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", { destination, checkIn, checkOut, guests })
  }

  return (
    <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div>
          <Label htmlFor="check-in">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? checkIn.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="check-out">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? checkOut.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <Label htmlFor="guests">Guests</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number.parseInt(e.target.value))}
            className="pl-10"
          />
          <Users className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button type="submit" className="w-full mt-4">
        Search
      </Button>
    </form>
  )
}

