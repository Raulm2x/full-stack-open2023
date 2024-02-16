import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'


const Anecdote = ({anecdote, onClick}) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={onClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const filteredAnecdotes = filter
      ? anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes

    return filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes)
  })

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))

    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired 
}

export default AnecdoteList