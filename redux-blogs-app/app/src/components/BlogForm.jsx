import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  //OnChanges
  const handleNewTitle = (event) => {
    //console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    //console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    //console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor || 'Unknown',
      url: newUrl || 'Not found',
    }
    dispatch(createBlog(newBlog, user))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    navigate('/')
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Add a new blog</h2>
      <form className='space-y-4' onSubmit={addBlog}>
        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='inputTitle'
          >
            Title:{' '}
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='inputTitle'
            value={newTitle}
            onChange={handleNewTitle}
          />
        </div>

        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='inputAuthor'
          >
            Author:{' '}
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='inputAuthor'
            value={newAuthor}
            onChange={handleNewAuthor}
          />
        </div>

        <div>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='inputUrl'
          >
            Url:{' '}
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='inputUrl'
            value={newUrl}
            onChange={handleNewUrl}
          />
        </div>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          id='save-blog'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
