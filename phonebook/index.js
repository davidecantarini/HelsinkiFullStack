const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

// GET all persons (3.1)
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// INFO page (3.2)
app.get('/info', (req, res) => {
  const count = persons.length
  const time = new Date()
  const html = `
    <div>
      <p>Phonebook has info for ${count} people</p>
      <p>${time}</p>
    </div>
  `
  res.send(html)
})

// GET a single person by id (3.3)
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// DELETE a person by id (3.4)
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const initialLength = persons.length
  persons = persons.filter(p => p.id !== id)
  if (persons.length === initialLength) {
    // nothing was removed -> id not found
    return res.status(404).json({ error: 'person not found' })
  }
  // successful deletion
  res.status(204).end()
})

// POST - add a new person (3.5 + 3.6)
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Validate presence of name and number
  if (!body.name || body.name.trim() === '') {
    return res.status(400).json({ error: 'name is missing' })
  }
  if (!body.number || body.number.trim() === '') {
    return res.status(400).json({ error: 'number is missing' })
  }

  // Validate uniqueness of name (exact match)
  const nameExists = persons.some(p => p.name === body.name)
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  // Generate id with Math.random (large range)
  const generateId = () => String(Math.floor(Math.random() * 1_000_000_000))
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons.push(newPerson)
  res.status(201).json(newPerson)
})

app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
