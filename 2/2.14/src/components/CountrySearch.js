import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Pass searchWord (str) and searchhandler (fun)
const CountrySearch = ({searchWord, handleSearch}) => {
  return(
    <div>
      find countries: <input value={searchWord} onChange={handleSearch} />
    </div>
  )
}

// Display countries (arr) and/or message according to searchWord (str)
const CountryDisplay = ({searchWord, countries}) => {
  // Filter list of countries according to searchword
  const filtered = countries.filter(country =>
    country.name.official.toLowerCase().includes(
      searchWord.toLowerCase()
      )
    )
  // See if too many results to display
  if (filtered.length > 10) {
    return(
      <div>Too many matches. Specify another filter.</div>
    )
  }
  // Show only the name when over 1 result
  if (filtered.length > 1)
    return(
      <div>
        {filtered.map(country => <CountryName key={country.name.official} countryName={country.name.official}/>)}
      </div>
      )
  // Finally show complete info when match found
  if (filtered[0].name.official.length !== 0) {
    return(
      <div>
        <CountryInfo country={filtered[0]} />
        </div>
      )
    }
  // Just return nothing if all else fails
  return(null)
  }

// Display a single country
const CountryName = ({countryName}) => {
  return(
    <p key={countryName}>{countryName}</p>
  )
}

// Display all asked information of a country
const CountryInfo = ({country}) => {
  // For languages we need the keys
  const langKeys = Object.keys(country.languages)
  // Extract languages
  var languages = []
  langKeys.forEach(langKey =>
    languages.push(country.languages[langKey])
  )
  return(
    <div>
    <p key={country.name}>name: {country.name.official}</p>
    <p key={country.capital}>capital: {country.capital}</p>
    <p key={country.region}>region: {country.region}</p>
    <h2>languages</h2>
    <ul>
      {languages.map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <img src={country.flags.png} alt={`flag of ${country.name.official}`}></img>
    <WeatherInfo capital={country.capital} />
    </div>
  )
}

// Display capital weather info
const WeatherInfo = ({capital}) => {
  // State variables for weatherinfo
  const [temp, setTemp] = useState("")
  const [wind, setWind] = useState("")
  const [condition, setCondition] = useState("")
  const [iconURL, setIconURL] = useState("")

  // Function to handle weatherinfo
  const getWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const weatherURL =
      'http://api.weatherapi.com/v1/current.json?key=' +
      api_key + '&q=' + capital
    axios
    .get(weatherURL)
    .then(response => {
      setTemp(response.data.current.temp_c)
      setWind(response.data.current.wind_kph)
      setCondition(response.data.current.condition.text)
      setIconURL(response.data.current.condition.icon)
      }
    ).catch(error => {
        alert(error.message + "\nMost probably your API key is bad.")
      }
    )
  }
  useEffect(getWeather, [capital])
  return(
    <div>
    <h2><b>Weather in {capital}</b></h2>
    <p key="temp"><b>temperature</b> (C): {temp}</p>
    <img src={iconURL} alt={''}></img>
    <p key="condition">{condition}</p>
    <p key="wind"><b>wind</b> (kmh): {wind} </p>
    </div>
  )

}

export default CountrySearch
export {CountryDisplay}
