import SearchForm from "./components/search-form"
import SearchResults from "./components/search-results"

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Stay</h2>
      <SearchForm />
      <SearchResults />
    </div>
  )
}