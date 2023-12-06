import { useState } from 'react'
import Button from './Button'
import Stats from './Stats'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
        <h1>Give feedback</h1>
        <Button onClick={handleGood} text="good"/>
        <Button onClick={handleNeutral} text="neutral"/>
        <Button onClick={handleBad} text="bad"/>
        <h1>Statistics</h1>
        <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App