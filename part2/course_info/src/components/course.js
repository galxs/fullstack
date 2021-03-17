import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const all = course.parts.map(x => x.exercises)
    const total = all.reduce((a, b) => a + b, 0)
    return(
      <p>Number of exercises {total} </p>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <li>{part.name} {part.exercises}</li>
    )
  }
  
  
  const Content = ({ course }) => {
    return (
      <div>
        <ul>
          {course.parts.map(part =>
            <Part key={part.id} part={part} />
            )}
        </ul> 
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  export default Course