import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'



const Persons = (props) => {
  return (
    <ul>
        {props.fpersons.map((person, i) => 
        <Person key={i} person={person} persons={npersons} /> )}
    </ul>
  )
}

const Delete = (props) => {
  return (
    <div>
      <button onClick ={() => axios.delete(`http://localhost:3001/persons/${person.id}`).then(console.log("istryniau"))}>delete</button>
    </div>
  )
}

const Person = ({person}) => {
  return (
    <div>
      <p>
        {person.name} {person.number} <Delete id={person.id} ></Delete>
      </p>
    </div>
    
  )
}
const Filter = (props) => {
  return (
      <form>
        <div>filter shown with <input value = {props.value} onChange = {props.onChange}/></div>
      </form>)
}

const PersonForm = (props) => {
  return (
    
      <form onSubmit = {props.onSubmit} >
        <div> name: <input value = {props.name} onChange = {props.nameChange} />
        </div>
        <div>number: <input value = {props.number} onChange = {props.numberChange} /></div>
        <div>
        <button type="submit" >add</button>
        </div>
      </form>)
      
}      

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber,
    }
    let name = 1
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(newName + ' is already in phonebook')
        setNewName('')
        setNewNumber('')
        name = 0
        break
      }
      else if (persons[i].name !== newName) {
      }
    }
    if (name===1) {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      })
    }  
}


  const handlePhonebookChange = (event) => {
      setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }



  let filteredPersons = persons.filter(a => a.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filter} onChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} name = {newName} nameChange = {handlePhonebookChange} number = {newNumber} numberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons fpersons={filteredPersons} npersons={persons} />
    </div>
  )
}

export default App