import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) // start empty
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState('')

  // Fetch initial data from db.json
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (nameExists) {
      setMessage(`${newName} is already in the phonebook`)
      setTimeout(() => setMessage(''), 3000) // optional: auto-hide message
    } else {
      const personObject = { 
        name: newName,
        number: '123-456789', // temporary number for now
        id: persons.length + 1 // simple id generation
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setMessage('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {message && <div style={{ color: 'red' }}>{message}</div>}

      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App
