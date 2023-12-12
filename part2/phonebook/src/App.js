import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [query, setQuery] = useState('')

  const hook = () => {
    console.log("effect")
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      console.log('promise fulfilled') 
      setPersons(response.data)
    })
  }

  useEffect(hook,[])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    const personExists = persons.some(person => person.name === newPerson.name)

    if (personExists) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewNumber('')
    }
    setNewName('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    setShowAll(query ? false : true)
  }

  const personsToShow = showAll
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={query} onChange={handleQuery}  /> 
      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        onChangeName = {handleNewName}
        number = {newNumber}
        onChangeNumber = {handleNewNumber}
      />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person => (
          <Persons key={person.id} name={person.name} number={person.number} />))}
      </ul>
    </div>
  )
}

export default App
