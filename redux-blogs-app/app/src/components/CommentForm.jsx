import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import apiBlogs from '../services/apiBlogs'
import { setBlogs } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [newComment, setNewComment] = useState('')

  const sendComment = async (event) => {
    event.preventDefault()
    const comment = { comment: newComment }
    try {
      await apiBlogs.makeComment(blog.id, comment)
      const upBlog = { ...blog, comments: blog.comments.concat(newComment) }
      const upBlogs = blogs.map((b) => (b.id === blog.id ? upBlog : b))
      dispatch(setBlogs(upBlogs))
      setNewComment('')
    } catch (e) {
      console.error('error sending comment', e)
    }
  }

  return (
    <form className='bg-white p-6 rounded-lg shadow-lg' onSubmit={sendComment}>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor='newComment'
      >
        Comment:
      </label>
      <textarea
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        rows={4}
        value={newComment}
        id='newComment'
        onChange={(event) => setNewComment(event.target.value)}
        placeholder='Write your comment here...'
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4'
        type='submit'
      >
        send
      </button>
    </form>
  )
}

export default CommentForm
