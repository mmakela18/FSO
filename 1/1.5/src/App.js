import React from 'react'

// Header huolehtii kurssin nimen renderöimisestä
const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

// Content osista ja niiden tehtävämääristä
const Content = (props) => {
  return (
    <>
      <Part osa={props.parts[0].name} harjoitus={props.parts[0].exercises} />
      <Part osa={props.parts[1].name} harjoitus={props.parts[1].exercises} />
      <Part osa={props.parts[2].name} harjoitus={props.parts[2].exercises} />
    </>
  )
}

// Part renderöi yhden osan nimen ja tehtävämäärän
const Part = (props) => {
  return (
    <>
      <p>{props.osa} {props.harjoitus}</p>
    </>
  )
}

// Total tehtävien yhteismäärästä
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises
          + props.parts[1].exercises
          + props.parts[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header kurssi={course}/>
    {/* Itseään toistavaa, mutta silmukat tulee varmaan myöhemmin */}
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default App
