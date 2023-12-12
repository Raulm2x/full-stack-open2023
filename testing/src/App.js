import React, { useState, useEffect } from "react";
import './App.css';
import Note from './components/Note.jsx';
import noteService from "./services/notes.js";

//const promise = axios.get('http://localhost:3001/notes')
//console.log(promise)

//promise.then(response => {
//  console.log(response) })

const App = () => {
 
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)

  //Hook
  const hook = () => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
  
    noteService    
    .create(noteObject)    
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')   
     })
  }

  const handleNoteChange = (event) => {    
    //console.log(event.target.value)    
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)
  
  const toggleImportanceOf = (id) => {   
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    }

  
  return (
    <div>
      <h1>Notes</h1>
      <div>    
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }        
        </button>      
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}        />
        <button type="submit">save</button>
      </form>   
    </div>
  )
};



export default App;
