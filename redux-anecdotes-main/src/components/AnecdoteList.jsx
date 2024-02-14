import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
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
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClick={() => vote(anecdote.id)}
        />
      )}
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired 
}

export default AnecdoteList