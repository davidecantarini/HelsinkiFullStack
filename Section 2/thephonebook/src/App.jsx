import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  // Fetch initial data from backend
  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  // Show temporary messages
  const showMessage = (text, duration = 3000) => {
    setMessage(text)
    setTimeout(() => setMessage(''), duration)
  }

  // Add or update a person
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with the new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? returnedPerson : p))
            showMessage(`Updated ${returnedPerson.name}'s number`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            showMessage(`Information of ${existingPerson.name} has already been removed`, 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showMessage(`Added ${returnedPerson.name}`)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // Delete a person
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showMessage(`Deleted ${person.name}`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)} style={{ marginLeft: '10px' }}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
