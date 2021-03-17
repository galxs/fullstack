import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState([])

  let filteredCountries = countries.filter(a => a.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    let params = {
      access_key: api_key,
      query: 'New York'}
    if (filteredCountries.length===1) {
      params ={access_key: api_key, query: `${filteredCountries[0].capital}, ${filteredCountries[0].name}`}}
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => { 
        setWeather(response.data)
      })
  }, [filteredCountries.length===1])


  console.log(weather)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const Country = (props) => {
    return (
      <div>
        <p>
          {props.country.name}  <button onClick ={() => setFilter(props.country.name)}>show</button>
        </p>
      </div>
      
    )
  }

  const Condition = (props) => {
    if (props.howMany.length >= 10 & filter !== '') {
      return (
        <div><p>there are too many matches</p></div>
      )
    }
    else if (props.howMany.length > 1 & props.howMany.length < 10){
      return (
      <ul>
      {filteredCountries.map((country, i) => 
        <Country key={i} country={country} setFilter={setFilter} />
        )}
    </ul>)
    }
    else if (filteredCountries.length ===1){
      return (
        <div>
          <h1>{filteredCountries[0].name}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>population {filteredCountries[0].population}</p>
          <h2>languages</h2>
          <ul>
          {filteredCountries[0].languages.map((language) => 
            <li key={language.name}>{language.name}</li>
          )}
          </ul>
          <img src={filteredCountries[0].flag} width="200px" height="auto" />
          <h3>Weather in {filteredCountries[0].capital}</h3>
          <p>Temperature: {weather.current.temperature}</p>
          <img src={weather.current.weather_icons}/>
          <p>Wind: {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>

        </div>
      )
    }
    else return null
  }


  
  console.log(filteredCountries.length)

  return (
    <div>
      <form>
        <div>find countries <input value = {filter} onChange = {handleFilterChange}/></div>
      </form>
      <Condition howMany={filteredCountries} filter ={filter}/>
    </div>)
}

export default App;
