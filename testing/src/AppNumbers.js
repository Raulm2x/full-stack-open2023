import React, { useState, useEffect } from "react";
import Note from './components/Note.jsx';
import axios from 'axios'

const Results = ({num1,num2}) => {
    const div = num2 === 0 ? 'no se divide entre cero' : num1/num2
    return (
    <div>
        <p>suma = {num1 + num2}</p>
        <p>resta = {num1 - num2}</p>
        <p>multiplicación = {num1 * num2}</p>
        <p>division = {div}</p>
    </div>
    )
}

const App = () => {
    const [num1,setNum1] = useState('')
    const [newNum1, setNewNum1] = useState('') 
    const [num2,setNum2] = useState('')
    const [newNum2, setNewNum2] = useState('')

    const doMath = (event) => {
        event.preventDefault()
        setNum1(Number(newNum1))
        setNum2(Number(newNum2))
    }

    return (
        <div>
             <h1>Ingresar números</h1>
            <form onSubmit={doMath}>
                <input value={newNum1} 
                onChange={(event) => setNewNum1(event.target.value)}/>
                <input value={newNum2} 
                onChange={(event) => setNewNum2(event.target.value)}/>
                <button type="submit">calc</button>
            </form>
            <h2>Resultados</h2>
            <Results num1={Number(newNum1)} num2={Number(newNum2)}/>

        </div>
    )
}

export default App