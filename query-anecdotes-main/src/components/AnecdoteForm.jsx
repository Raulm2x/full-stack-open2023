import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5 ){
    newAnecMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
    } else {
      setErrorMessage('Content must be at least 5 characters long')
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }

  const messageStyle = {color: 'red'}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
      {errorMessage && <div style={messageStyle}> {errorMessage}</div>}
    </div>
  )
}

export default AnecdoteForm
