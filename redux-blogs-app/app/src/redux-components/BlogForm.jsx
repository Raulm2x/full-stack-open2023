import { useState } from 'react'
import apiBlogs from '../services/apiBlogs'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const BlogForm = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

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

  const createBlog = async (newBlog) => {
    console.log('new blog', newBlog)
    try {
      await apiBlogs.create(newBlog)
      dispatch(appendBlog(newBlog))

      dispatch(
        setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`,true,5)
      )
    } catch (error) {
      console.error(error)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor || 'Unknown',
      url: newUrl || 'Not found',
    }
    createBlog(newBlog)
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div className='blogForm'>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor='inputTitle'>Title: </label>
        <input id='inputTitle' value={newTitle} onChange={handleNewTitle} />
        <br />

        <label htmlFor='inputAuthor'>Author: </label>
        <input id='inputAuthor' value={newAuthor} onChange={handleNewAuthor} />
        <br />

        <label htmlFor='inputUrl'>Url: </label>
        <input id='inputUrl' value={newUrl} onChange={handleNewUrl} />
        <br />

        <button id='save-blog' type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BlogForm
