import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import apiBlogs from '../services/apiBlogs'
import { setBlogs } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [newComment, setNewComment] = useState('')

  const sendComment = async (event) => {
    event.preventDefault()
    const comment = { comment: newComment }
    try{
      await apiBlogs.makeComment(blog.id, comment)
      const upBlog = { ...blog, comments:blog.comments.concat(newComment) }
      const upBlogs = blogs.map(b => b.id === blog.id
        ? upBlog
        : b
      )
      dispatch(setBlogs(upBlogs))
      setNewComment('')
    } catch (e) {
      console.error('error sending comment',e)
    }
  }

  return (
    <form onSubmit={sendComment}>
      <label htmlFor='newComment'>Comment:</label><br/>
      <textarea
        rows={4} cols={50}
        value={newComment}
        id='newComment'
        onChange={(event) => setNewComment(event.target.value)}
        placeholder='Write your comment here...'
      /><br/>
      <button type='submit'>send</button>
    </form>
  )
}

export default CommentForm
