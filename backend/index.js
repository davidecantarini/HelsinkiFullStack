const express = require('express')
const app = express()

let notes = [
  { id: 1, content: 'Note one', important: true },
  { id: 2, content: 'Note two', important: false }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})