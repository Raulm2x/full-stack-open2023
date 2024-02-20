import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { createAnecdote } from '../request'
import NotificationContext from "../notificationContext"


const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({payload: `Added '${newAnecdote.content}'` })
      setTimeout(() => {
        dispatch({payload: '' })
      }, 5000)
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
      dispatch({payload: 'Content must be at least 5 characters long' })
      setTimeout(() => {
        dispatch({payload: '' })
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
    </div>
  )
}

export default AnecdoteForm
