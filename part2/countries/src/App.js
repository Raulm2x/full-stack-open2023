import { useState, useEffect } from 'react';
import server from './services';
import Countries from './components/Countries.jsx'

const App = () => {
  const [countries,setCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const hook = () => {
    server.getAll()
    .then(response => {
      console.log("Countries loaded")
      setCountries(response)
    })
    .catch(error => {
      console.log("Starting...")
    })
  }
  useEffect(hook,[])

  if (!countries){
    console.log("Loading countries, please wait...")
    return (
      <h1>Loading countries...</h1>
    )
  }
  else {
    const countriesToShow = showAll ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

    console.log(countriesToShow.length, "countries rendered.")

    const handleSearch = (event) => {
      setSearch(event.target.value)
      if (search){
        setShowAll(false)
      }
      else{
        setShowAll(true)
      }
    }

    return (
      <div className="App">
        <h1>Countries</h1>
        <div>
          <label>Find countries:</label>
          <input id='searchCountries' 
          value={search} 
          onChange={handleSearch}/>
        </div>
        <Countries countries={countriesToShow}/>
      </div>
    );
  }

  
}

export default App;
