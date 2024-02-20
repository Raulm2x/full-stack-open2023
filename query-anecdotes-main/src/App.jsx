import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useReducer } from 'react'
import NotificationContext from './notificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const notificationReducer = (state, action) => {
  return action.payload
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const voteAnecMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (upAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const upAnecdotes = anecdotes.map(anec => anec.id === upAnecdote.id
        ? upAnecdote
        : anec  
      )
      queryClient.setQueryData(['anecdotes'], upAnecdotes)

      notificationDispatch({payload: `voted '${upAnecdote.content}'`})
      setTimeout(() => {
        notificationDispatch({payload: ''})
      }, 5000)
    }

  })

  const handleVote = (anecdote) => {
    const anecToVote = anecdotes.find(ac => ac.id === anecdote.id)
    voteAnecMutation.mutate({...anecToVote, votes: anecToVote.votes + 1})
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))
    
  if(result.isPending ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
      
      <Notification />
     
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
