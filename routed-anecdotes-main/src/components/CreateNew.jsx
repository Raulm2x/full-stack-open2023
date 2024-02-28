import { useField } from "../hooks"

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const {clearField:bruh1, ...inputAuthor} = author
  const {clearField:bruh2, ...inputContent} = content
  const {clearField:bruh3, ...inputInfo} = info
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const reset = () => {
    console.log('reset')
    content.clearField()
    info.clearField()
    author.clearField()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputContent} />
        </div>
        <div>
          author
          <input {...inputAuthor} />
        </div>
        <div>
          url for more info
          <input {...inputInfo} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={reset}>reset</button>
      </form>
     
    </div>
  )
}

export default CreateNew