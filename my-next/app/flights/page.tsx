"use client"

import { useState } from "react"
import FlightSearchForm from "../components/flight-search-form"
import FlightSearchResults from "../components/flight-search-results"

export default function FlightsPage() {
  const [searchCriteria, setSearchCriteria] = useState({ origin: "", destination: "" })

  const handleSearch = (origin: string, destination: string) => {
    setSearchCriteria({ origin, destination })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Flight</h2>
      <FlightSearchForm onSearch={handleSearch} />
      <FlightSearchResults origin={searchCriteria.origin} destination={searchCriteria.destination} />
    </div>
  )
}

