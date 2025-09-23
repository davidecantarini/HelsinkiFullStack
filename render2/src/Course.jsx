// Course.jsx
import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    console.log('Accumulator (sum):', sum, '| Current part:', part)
    return sum + part.exercises
  }, 0)

  console.log('Final total:', total)

  return <p><b>Total of {total} exercises</b></p>
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
