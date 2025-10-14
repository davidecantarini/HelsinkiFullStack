const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs').promises

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Data file path
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'contacts.json')

async function ensureDataFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.access(DATA_FILE)
  } catch (_) {
    const initial = []
    await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8')
  }
}

async function readContacts() {
  await ensureDataFileExists()
  const raw = await fs.readFile(DATA_FILE, 'utf8')
  return JSON.parse(raw)
}

async function writeContacts(contacts) {
  await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf8')
}

function generateId(existing) {
  const maxId = existing.length > 0 ? Math.max(...existing.map(c => Number(c.id))) : 0
  return String(maxId + 1)
}

// API routes
app.get('/api/contacts', async (_req, res) => {
  const contacts = await readContacts()
  res.json(contacts)
})

app.get('/api/contacts/:id', async (req, res) => {
  const contacts = await readContacts()
  const contact = contacts.find(c => c.id === req.params.id)
  if (!contact) return res.status(404).json({ error: 'not found' })
  res.json(contact)
})

app.post('/api/contacts', async (req, res) => {
  const { name, number } = req.body || {}
  if (!name || !number) return res.status(400).json({ error: 'name and number required' })
  const contacts = await readContacts()
  const exists = contacts.some(c => c.name.toLowerCase() === String(name).toLowerCase())
  if (exists) return res.status(409).json({ error: 'name must be unique' })
  const contact = { id: generateId(contacts), name, number }
  const updated = contacts.concat(contact)
  await writeContacts(updated)
  res.status(201).json(contact)
})

app.put('/api/contacts/:id', async (req, res) => {
  const { name, number } = req.body || {}
  if (!name && !number) return res.status(400).json({ error: 'name or number required' })
  const contacts = await readContacts()
  const idx = contacts.findIndex(c => c.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  const updatedContact = { ...contacts[idx], ...(name ? { name } : {}), ...(number ? { number } : {}) }
  contacts[idx] = updatedContact
  await writeContacts(contacts)
  res.json(updatedContact)
})

app.delete('/api/contacts/:id', async (req, res) => {
  const contacts = await readContacts()
  const exists = contacts.some(c => c.id === req.params.id)
  if (!exists) return res.status(404).json({ error: 'not found' })
  const filtered = contacts.filter(c => c.id !== req.params.id)
  await writeContacts(filtered)
  res.status(204).end()
})

// Static hosting for frontend build
const DIST_DIR = path.join(__dirname, 'dist')
app.use(express.static(DIST_DIR))

// SPA fallback for non-API routes
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'))
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Phonebook server running on port ${PORT}`)
})


