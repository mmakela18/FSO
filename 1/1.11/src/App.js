import React, {useState} from 'react'

// Header: otsikon taso ja teksti
const Header = ({level, text}) => {
  const Tag = "h" + level
  return (
    <><Tag>{text}</Tag></>
  )
}

// Nappikomponentti: annettava nimi, tila, ja tilanasetuskutsu
// Luo tapahtumankäsittelijän napille ja palauttaa napin
const Button = ({name, state, setState, handler}) =>
    <><button onClick={() => handler(state, setState)}>{name}</button></>

  // Näytä tilastot
const Stats = ({good, bad, neutral}) => {
  const summa = good + bad + neutral
  if (summa === 0) {
    return (
      <>Annettuja palautteita ei ole vielä.</>
    )
  }
  return (<table>
    <StatisticsLine text="Hyviä:" value={good} />
    <StatisticsLine text="Neutraaleja:" value={neutral} />
    <StatisticsLine text="Huonoja:" value={bad} />
    <StatisticsLine text="Yhteensä:" value={summa} />
    <StatisticsLine text="Keskiarvo:" value={(((good) + (bad*-1))/(summa)).toFixed(1)} />
    <StatisticsLine text="Positiivisia: " value={(good * 100 / summa).toFixed(1)} sectext={"%"} />
  </table>)
}

const StatisticsLine = ({text, value, sectext}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} {sectext}</td>
      </tr>
    </tbody>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (state, setState) => setState(state + 1)

  return (
    <div>
      {/*Pääotsikko*/}
      <Header level={1} text={"Annahan palautetta:"}/>
      {/*Naputtihimet*/}
      <Button name={"Hyvä"} state={good} setState={setGood} handler={handleClick}/>
      <Button name={"Neutraali"} state={neutral} setState={setNeutral} handler={handleClick}/>
      <Button name={"Huono"} state={bad} setState={setBad} handler={handleClick}/>
      {/*Alaotsikko*/}
      <Header level={2} text={"Tilastoja:"} />
      {/*Tilastolaskuri*/}
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
