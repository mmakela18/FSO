import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountrySearch, { CountryDisplay } from './components/CountrySearch'

const App = () => {
  // Empty array of objects to save countries to
  const [countries, setCountries] = useState([{name: {official: ""}}])
  // State for searchword
  const [searchWord, setSearchWord] = useState('')
  // Function to retrieve countries
  const getCountries = () => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  }
  // Function to handle searchword
  const handleSearch = (event) => {
    setSearchWord(event.target.value)
  }
  // Only fetch countries once
  useEffect(getCountries, [])
  return(
    <div>
      <CountrySearch searchWord={searchWord} handleSearch={handleSearch} />
      <CountryDisplay searchWord={searchWord} countries={countries} />
    </div>
  )
}

export default App;
