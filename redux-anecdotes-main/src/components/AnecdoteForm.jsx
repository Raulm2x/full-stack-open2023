import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setMessage } from "../reducers/notificationReducer"
import apiAnecdotes from '../services/anecdotes'

const  AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const newAnecdote = await apiAnecdotes.createNew(content)
    dispatch(addAnecdote(newAnecdote))
    
    dispatch(setMessage(`you successfully added '${content}'`))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm