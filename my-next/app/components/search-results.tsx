"use client"

import { useState } from "react"
import { Star, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockResults = [
  {
    id: 1,
    name: "Luxury Beach Resort",
    image: "/placeholder.svg?height=200&width=300",
    price: 250,
    rating: 4.8,
    location: "Maldives",
  },
  {
    id: 2,
    name: "City Center Hotel",
    image: "/placeholder.svg?height=200&width=300",
    price: 150,
    rating: 4.2,
    location: "New York",
  },
  {
    id: 3,
    name: "Mountain Retreat",
    image: "/placeholder.svg?height=200&width=300",
    price: 180,
    rating: 4.5,
    location: "Swiss Alps",
  },
]

export default function SearchResults() {
  const [sortBy, setSortBy] = useState("price")

  const sortedResults = [...mockResults].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price: Low to High</SelectItem>
            <SelectItem value="rating">Rating: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedResults.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <CardTitle>{result.name}</CardTitle>
              <CardDescription>{result.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={result.image || "/placeholder.svg"}
                alt={result.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                  <span className="font-bold">{result.price}</span>
                  <span className="text-gray-500 ml-1">per night</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>{result.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

