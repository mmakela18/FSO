import React, { useState } from 'react'

// Just a header
// text: header text. level: header level (ie. h1, h2, etc)
const Header = ({text, level}) => {
  const Tag = 'h' + level
  return (
    <Tag>{text}</Tag>
  )
}

// Randomizing button
// setState: function to change the state of target
// randomFunction: function that returns a random state for anecdotes
const RandomButton = ({setState, randomFunction}) => {
  return (
    <>
    <button onClick={() => setState(randomFunction())}>next anecdote</button>
    </>
  )
}

// Line that displays the votes of the current state
// state: current state. votes: array of votes where index corresponds to state
const VoteLine = ({state, votes}) => {
  return (
    <>
    has {votes[state]} votes
    </>
  )
}

// Vote on currently displayed state and store result.
// selected: current state. votes: vote-array
const VoteButton = ({state, setState, votes}) => {
  // increase: increment the state of the votes of the current state
  const increase = (state, votes) => {
    const copy = [...votes]
    copy[state] += 1
    return copy
  }
  return (
    <> {/* Bind vote-button to increase-functions */}
    <button onClick={() => setState(increase(state, votes))}>vote!</button>
    </>
  )
}

// Show the anecdote with most votes
// anecdotes: array of anecdotes. votes: array of votes
const MostVotes = ({anecdotes, votes}) => {
  const indeksi = votes.indexOf(Math.max(...votes))
  return (
    <>
    {anecdotes[indeksi]}
    <br></br>
    <VoteLine state={indeksi} votes={votes} />
    </>
  )
}

// MAIN
const App = () => {
  // anecdotes to display
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'Check your syntax before spending 45 minutes on Google chasing dead ends.\nOr get a better spell checker.'
  ]
  // Array for counting votes. Index corresponds to anecdote
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  // Function to randomize state
  const rando = () => Math.floor(Math.random() * anecdotes.length)
  // Anecdote selection-state
  const [selected, setSelected] = useState(rando())
  return (
    <div>
      <Header text="Anecdote of the day:" level={1} />
      {anecdotes[selected]}
      <br></br>
      <VoteLine state={selected} votes={votes} />
      <br></br>
      <VoteButton state={selected} setState={setVotes} votes={votes} />
      <RandomButton randomFunction={rando} setState={setSelected}/>
      <Header text="Anecdote with most votes:" level={2} />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
