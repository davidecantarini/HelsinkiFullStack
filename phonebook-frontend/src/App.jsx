import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadContacts = async () => {
    try {
      const res = await fetch('/api/contacts')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setContacts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, number })
    })
    if (!res.ok) {
      const msg = (await res.json()).error || `HTTP ${res.status}`
      setError(msg)
      return
    }
    setName('')
    setNumber('')
    await loadContacts()
  }

  const onDelete = async (id) => {
    setError(null)
    const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    if (!res.ok && res.status !== 204) {
      const msg = (await res.json()).error || `HTTP ${res.status}`
      setError(msg)
      return
    }
    await loadContacts()
  }

  const onEdit = async (id) => {
    const newNumber = prompt('New number?')
    if (!newNumber) return
    setError(null)
    const res = await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number: newNumber })
    })
    if (!res.ok) {
      const msg = (await res.json()).error || `HTTP ${res.status}`
      setError(msg)
      return
    }
    await loadContacts()
  }

  if (loading) return <div>Loading…</div>

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Phonebook</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} />
        <button type="submit">Add contact</button>
      </form>

      <ul style={{ paddingLeft: 16 }}>
        {contacts.map(c => (
          <li key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{c.name} — {c.number}</span>
            <button onClick={() => onEdit(c.id)}>Edit</button>
            <button onClick={() => onDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
