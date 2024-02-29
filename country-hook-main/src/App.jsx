import React, { useState, useEffect } from 'react'
import apiCountries from './apiCountries'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [data, setData] = useState(null)

  const getCountry = async () => {
    console.log('...trying to find',name)
    try {
      const found = await apiCountries.getByName(name)
      console.log('Country found: ', found.name.common)
      if (found.name) {
        const foundData = {
          name: found.name.common,
          capital: found.capital[0] || 'NaN',
          population: found.population,
          flag: found.flags.png,
          found: true
        }
        setData(foundData)
        console.log('Country data',foundData)
      }
    }
    catch(error){
      //console.error(error)
      setData({found:false})
    }
  }

  useEffect(() => {
    if (name) {
      getCountry()
    }
  }, [name])

  return {data}
}

const Country = ({ country }) => {
  if (!country.data) {
    return null
  }

  if (!country.data.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>Capital: {country.data.capital} </div>
      <div>Population: {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = async (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App