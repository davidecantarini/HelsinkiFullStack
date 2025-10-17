import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(25 * 60)
  }

  return (
    <div className="app">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <div className="time-display">
          {formatTime(timeLeft)}
        </div>
        <div className="controls">
          {!isRunning ? (
            <button onClick={startTimer} className="start-btn">
              Start
            </button>
          ) : (
            <button onClick={stopTimer} className="stop-btn">
              Stop
            </button>
          )}
          <button onClick={resetTimer} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App