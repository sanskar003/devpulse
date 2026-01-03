import { useEffect, useState } from "react"
import GnewsCard from "../components/GnewsCard"
import NewsSearchBar from "../components/NewsSearchBar"

const GnewsPage = () => {

  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [country, setCountry] = useState("in")

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search)
    }, 300);

    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="flex flex-col gap-2 items-center ">
      <NewsSearchBar
        search={search}
        setSearch={setSearch}
        country={country}
        setCountry={setCountry}
      />

      <GnewsCard search={query} country={country} />
    </div>
  )
}

export default GnewsPage