import { useState } from 'react'
import { useRef } from 'react'

function App() {
  const inputRef = useRef(null)
  const [name, setName] = useState('')
  const [counter, setCounter] = useState(0)
    
  const applyName = () => {
    if (inputRef.current.value) {
      setName(inputRef.current.value);
      inputRef.current.value = '';
      setCounter(counter + 1)
    }
  }

  return (
    <div>
      <h1>{counter}</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="Enter your name" />
        <button onClick={applyName}>Set name</button>
      </div>
      <p>Name: {name || '—'}</p>
    </div>
  )
}

export default App
