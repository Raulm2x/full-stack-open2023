const AnecdoteDetails = ({anecdote}) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <button>vote</button>
  </div>
)

export default AnecdoteDetails