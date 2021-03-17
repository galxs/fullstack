import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'



const Persons = (props) => {
  return (
    <ul>
        {props.fpersons.map((person, id) => 
        <Person key={id} person={person} setPersons={props.setPersons} persons={props.persons} sNM={props.sNM} sEM={props.sEM}/> )}
    </ul>
  )
}

const Delete = (props) => {
  return (
      <button onClick ={() => {if (window.confirm(`Delete ${props.name}?`))
        axios.delete(`http://localhost:3001/persons/${props.id}`)
      .then(response => {
        let persons = props.persons.filter(a => a.id !== props.id)
        props.setPersons(persons)
        props.setNotificationMessage(`${props.name} was removed from phonebook`)
        setTimeout(() => {
          props.setNotificationMessage(null)
        },5000)
        }).catch(error => {
          props.setErrorMessage(`${props.name} does not exist in phonebook`)
          setTimeout(() => {
            props.setErrorMessage(null)
          },5000)
          props.setPersons(props.persons.filter(n => n.id !== props.id))
        })    

      }}>delete</button>
      
  )
}

const Person = (props) => {
  return (
    <div>
      <p>
        {props.person.name} {props.person.number} <Delete id={props.person.id} setPersons={props.setPersons} persons={props.persons} name={props.person.name} setNotificationMessage={props.sNM} setErrorMessage={props.sEM}></Delete>
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
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }


const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    let newId = persons[persons.length-1].id +1
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber,
        id: newId
    }
    let cond = 1
    let id = undefined
    for (let i = 0; i < persons.length; i++) {
      
      if (persons[i].name === newName && persons[i].number !== newNumber) {
        cond = 2
        id = persons[i].id
        break
      }

      else if (persons[i].name === newName) {
        alert(newName + ' is already in phonebook')
        setNewName('')
        setNewNumber('')
        cond = 0
        break
      }
      else if (persons[i].name !== newName) {
        cond = 1
      }

    }
    if (cond===1) {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`${personObject.name} was added to the phonebook`)
        setTimeout(() => {
          setNotificationMessage(null)
        },5000)
      })
    } 
    else if (cond===2) {
      const target = persons.find(a => a.id === id)
      const changedNumber = {...target, number: newNumber }
      if (window.confirm(`${target.name} is already added to the phonebook, replace the old number with a new one?`)){
      personService
      .update(target.id, changedNumber)
      .then(response =>{
        setPersons(persons.map(person => person.id !== target.id? person : changedNumber))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Person's '${target.name}' number was changed`)
        setTimeout(() => {
          setNotificationMessage(null)
        },5000)

      }) 
      .catch(error => {
        setErrorMessage(`Person ${target.name} does not exist in phonebook anymore`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setPersons(persons.filter(n => n.id !== target.id))
      })    
    }        
    setNewName('')
    setNewNumber('')
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
      <Error message = {errorMessage}/>
      <Notification message = {notificationMessage}/>
      <Filter value = {filter} onChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addName} name = {newName} nameChange = {handlePhonebookChange} number = {newNumber} numberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons fpersons={filteredPersons} setPersons={setPersons} persons={persons} sNM={setNotificationMessage} sEM={setErrorMessage}/>
    </div>
  )
}

export default App