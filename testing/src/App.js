import React, { useState, useEffect } from "react";
import coservs from './services/countries.js';
import Country from "./components/countries/Country.jsx";
import FormCountry from "./components/countries/FormCountry.jsx";
import DropdownMenu from "./components/countries/DropDownMenu.jsx";
import FormDescription from "./components/countries/FormDescription.jsx";

const messagge = "Write a country's description..."

const App = () => {
    const [countries,setCountries] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [newName, setNewName] = useState('')
    const [newContinent, setNewContinent] = useState('')
    const [newDescription, setNewDescription] = useState(messagge)
    const [isChecked, setChecked] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("None")
    const [changedDescription, setChangedDescription] = useState(messagge)
    const [otherChecked, setOtherChecked] = useState(false)

    const hook = () =>{
        coservs
        .getAll()
        .then(initialCountries => {
            console.log("promise fullfiled")
            //console.log(initialCountries)
            setCountries(initialCountries)
        })
    }
    useEffect(hook,[])
    console.log("there are",countries.length,"countries rendered")
   
    const countriesToShow = showAll
      ? countries
      : countries.filter(country => country.visited)

    const addCountry = (event) =>{
        event.preventDefault()
        const newCountry = {
            name : newName,
            continent: newContinent,
            description: newDescription,
            visited: isChecked
        }
        coservs
        .create(newCountry)
        .then(returnedCountry =>{
            setCountries(countries.concat(returnedCountry))
            console.log(newName, "was saved successfully!")
            setNewName('')
            setNewContinent('')
            setNewDescription(messagge)
            setChecked(false)
        })
    }

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value)
    }
   
    const changeDescription = (event) => {
        event.preventDefault()
        const country = countries.find(c => c.name === selectedCountry)
        console.log(country)
        const id = country.id
        const changedCountry = {...country, description: changedDescription, visited: otherChecked }

        coservs
        .update(id, changedCountry)
        .then(returnedCountry => {
            setCountries(countries.map(country => country.id != id? country : returnedCountry))
        })
    }

    return (
        <div>
            <h1>Countries</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll? "visited":"all"}
            </button>
            <ul>
                {countriesToShow.map(country => 
                    <Country key={country.id}
                     country={country}/>
                )}
            </ul>
            <h2>Add a new country</h2>
            <FormCountry 
                onSubmit={addCountry}
                newName = {newName}
                handleNewName = {(event) => setNewName(event.target.value)}
                newContinent = {newContinent}
                handleNewContinent = {(event) => setNewContinent(event.target.value)}
                newDescription = {newDescription}
                handleNewDescription = {(event) => setNewDescription(event.target.value)}
                checked = {isChecked}
                handleChecked = {() => setChecked(!isChecked) }
            />
            <h2>Change the description of a country</h2>
            <DropdownMenu
                countries={countries}
                selectedCountry={selectedCountry}
                handleCountryChange={handleCountryChange}
            />
            <FormDescription
                onSubmit = {changeDescription}
                newDescription = {changedDescription}
                handleNewDescription = {(event) => setChangedDescription(event.target.value)}
                checked = {otherChecked}
                handleChecked = {() => setOtherChecked(!otherChecked) }
            />


        </div>
    )
}

export default App