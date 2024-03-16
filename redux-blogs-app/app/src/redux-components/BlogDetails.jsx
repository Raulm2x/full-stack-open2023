import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'

import apiBlogs from '../services/apiBlogs'

import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'

//OnClick:handleLikeButton
const BlogDetails = ({ blog, handleRemove }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const [visible, setVisible] = useState(false)
  const [likedBlog, setLikedBlog] = useState(false)

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

  const button = () => {
    return (
      <button onClick={() => setVisible(!visible)}>
        {visible? 'hide':'view'}
      </button>
    )
  }

  useEffect(() => {
    if (user) {
      setLikedBlog(blog.likedBy
        ? blog.likedBy.some(u => u.toString() === user.id.toString())
        : false
      )
    }
  }, [user, blog.likedBy])

  const ownedBlog = user? user.blogs.find(b => b.id === blog.id): false

  return (
    <li className='blog'>
      <h3>{blog.title} {button()}</h3>
      Author: {blog.author}<br/>
      {visible &&
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
      }
    </li>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  OnClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default BlogDetails