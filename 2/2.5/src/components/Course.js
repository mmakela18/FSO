import React from 'react'

// Render all course information
const Course = ({course}) => {
  return(
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

// Render course name
const Header = ({name}) => {
  return(
    <>
      <h1>{name}</h1>
    </>
  )
}

// Render course content
const Content = ({parts}) => {
  return(
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </>
  )
}

// Render one unit and its number of exercises
const Part = (props) => {
  return(
    <>
      <p key={props.id}>{props.name} {props.exercises}</p>
    </>
  );
}

// Render total amount of exercises in course
const Total = ({parts}) => {
  // Count together exercises (the hard way >.<)
  const total = parts.reduce( (previousValue, currentValue) =>
    previousValue + currentValue.exercises,
    0
  ); // <-- How is this shorter than a loop?

  return(
    <>
      <b>total of {total} exercises</b>
    </>
  );
}

export default Course
