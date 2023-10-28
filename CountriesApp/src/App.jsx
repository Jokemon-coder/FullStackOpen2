import { useEffect, useState } from 'react'
import Country from './Components/Country';
import Filter from './Components/FilterBar';
import FilterList from './Components/FilteredList';
import axios from 'axios'

const App = () => {
  const countriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

  const [filtered, setFiltered] = useState([]);
  const [all, setAll] = useState([])

  const handleFilter = (event) => {
    console.log(all)
    let filteredCountries = all.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFiltered(filteredCountries);
    /*for (let index = 0; index < all.length; index++) {
      const element = all[index];
      let filter = element.name.common.toLowerCase().includes(e.target.value.toLowerCase());
      setFiltered(filter);
    }*/
    //setFiltered(filter);
    //setFiltered(e.target.value)
  }

  let mappedCountries = filtered.map((c) => {
    console.log(filtered.indexOf(c));
    return (
      <p key={filtered.indexOf(c)}>
        {c.name.common}
      </p>
    )
  })

  useEffect(() => {
    axios.get(countriesURL).then((res) => {
      setAll(res.data);
      setFiltered(res.data);
    })
  }, [])

  useEffect(() => {
console.log(filtered);
  }, [filtered])

  return (
    <>
    <Filter onchange={handleFilter}></Filter>
    <FilterList countries={filtered} mappedCountries={mappedCountries}></FilterList>
    </>
  )
}

export default App
