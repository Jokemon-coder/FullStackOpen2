import { useEffect, useState } from 'react'
import Filter from './Components/FilterBar';
import FilterList from './Components/FilteredList';
import Country from './Components/Country';
import countries from './Services/countries';
import './index.css'

const App = () => {
  const countriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
  
  const apiKey = import.meta.env.VITE_API_KEY;

  const [capitalWeather, setCapitalWeather] = useState();

  //State to track if the data has been loaded
  const [hasLoaded, setHasLoaded] = useState(false)

  //States for the various stages of the data
  const [filtered, setFiltered] = useState([]);
  const [all, setAll] = useState([])
  const [singleCountry, setSingleCountry] = useState(false)

  const handleFilter = (event) => {
    //Filter the countries on each keystroke and set the state
    let filteredCountries = all.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries);

    //Set the state of a single country to either the country that is the only one on the list or to false
    filteredCountries.length === 1 ? setSingleCountry(filteredCountries[0]) : setSingleCountry(false);
  }

  //Map the filtered countries
  let mappedCountries = filtered.map((c) => {
    return (
      <div key={filtered.indexOf(c)} className='countryDiv'><p>{c.name.common}</p><button onClick={()=>setSingleCountry(c)}>Show</button></div>
    )
  })

  //Get the data on first render and set everything up
  useEffect(() => {
    countries.GetCountries(countriesURL).then((res) => {
      setAll(res.data);
      setFiltered(res.data);
      setHasLoaded(true)
    })
  }, [])

  const getGeo = (city, code, limit) => {
    //Get the location of the given city to utilize it for getting its weather
    countries.GetGeoLocation(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${code}&limit=${limit}&appid=${apiKey}`).then((res) => {
      countries.GetWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=${apiKey}`).then((res) => {
      setCapitalWeather(res.data);
    })
    });
  }

  return (
    <>
    <Filter onchange={handleFilter}></Filter>
    <FilterList single={singleCountry} loading={hasLoaded} countries={filtered} mappedCountries={mappedCountries}></FilterList>
    <Country country={singleCountry} getGeo={getGeo} weather={capitalWeather}></Country>
    </>
  )
}

export default App
