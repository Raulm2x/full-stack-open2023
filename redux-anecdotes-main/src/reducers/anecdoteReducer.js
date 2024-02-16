import { createSlice } from '@reduxjs/toolkit'
import apiAnecdotes from '../services/anecdotes'

const anecdoteSlice= createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    },
    appendAnecdote(state,action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await apiAnecdotes.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await apiAnecdotes.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  return async dispatch => {
    await apiAnecdotes.update(anecdote.id, votedAnecdote)
    dispatch(vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer