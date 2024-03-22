import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setUsers } from '../reducers/usersReducer'

import apiBlogs from '../services/apiBlogs'


import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'
import CommentForm from './CommentForm'


const BlogDetails = ({ blog }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state  => state.users)

  const [likedBlog, setLikedBlog] = useState(false)

  //Like Button
  const handleLikeButton = async (blog, action) => {
    const updatedBlog = { ...blog, action }

    try {
      await apiBlogs.update(blog.id, updatedBlog)
      console.log(action? 'liked':'disliked')

      const upBlogs = blogs.map(b => (b.id === blog.id
        ? { ...blog,
          likes: blog.likes + (action? 1:-1),
          likedBy: action
            ? blog.likedBy.concat(user.id)
            : blog.likedBy.filter(b => b !== user.id)
        }
        : b
      ))
      //console.log('upBlogs', upBlogs)
      dispatch(setBlogs(upBlogs))

      const upUser = { ...user,
        liked: action
          ? user.liked.concat(blog.id)
          : user.liked.filter(l => l.toString() !== blog.id.toString()) }
      //console.log('upUser', upUser)
      if (upUser && user !== upUser) {
        dispatch(setUser(upUser))
      }
    } catch (error){
      console.error(error)
    }
  }

  //Remove Button
  const handleRemove = async (blog) => {
    if (window.confirm(`Delete titled blog: ${blog.title}?`)) {
      try{
        await apiBlogs.erase(blog.id)

        const upUser = { ...user,
          blogs: user.blogs.filter(l => l !== blog.id) }
        dispatch(setUser(upUser))

        const upUsers = users.map(u => u.id === user.id
          ? upUser
          : u
        )
        dispatch(setUsers(upUsers))

        const upBlogs = blogs.filter(b => b.id !== blog.id)
        dispatch(setBlogs(upBlogs))

        dispatch(setNotification(`${blog.title} by ${blog.author} was removed`, true, 5))
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (user && blog) {
      setLikedBlog(blog.likedBy
        ? blog.likedBy.some(u => u.toString() === user.id.toString())
        : false
      )
    }
  }, [user])


  if (!blog){
    return <div>Blog does not exist</div>
  }

  let ownedBlog = false
  if (user && blogs) {
    ownedBlog = user? user.blogs.find(b => b === blog.id): false
  } else {
    ownedBlog = false
  }

  const showComments = () => {
    return (
      <div>
        <h3>Comments</h3>
        <CommentForm blog={blog}/>
        <br/>
        {blog.comments.length !== 0?
          <ul>
            {blog.comments.map((comment, index) =>
              <li key={index}>{comment}</li>)}
          </ul>
          : <div>This blog does not have comments yet.</div>
        }
      </div>
    )
  }

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      Author: {blog.author}<br/>
      <div className='moreDetails'>
        Url: <a href={blog.url} target="_blank" rel='noreferrer'>{blog.url}</a><br/>
        Likes: {blog.likes}
        {user && <LikeButton OnClick={handleLikeButton} blog={blog} liked={likedBlog}/>}
        <br/>
        {(blog.user && user) &&
          <div>
          Posted by: {blog.user.name || blog.user.username}
          </div>
        }
        {ownedBlog && <RemoveButton handleRemove={handleRemove} blog={blog}/>}
      </div>
      {showComments()}
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object
}

export default BlogDetails