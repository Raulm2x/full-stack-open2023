import { createSlice } from '@reduxjs/toolkit'
import apiBlogs from '../services/apiBlogs'
import listHelper from '../../../utils/list_helper'
import { useSelector } from 'react-redux'
import { setUser } from './userReducer'
import { setNotification } from './notificationReducer'


const blogSlice = createSlice({
  name:'blogs',
  initialState:[],
  reducers:{
    setBlogs(state,action){
      return action.payload
    },
    sortBlogs(state,action){
      const sortedBlogs = listHelper.sortByLikes(state)
      return sortedBlogs
    },
    appendBlog(state,action){
      return state.concat(action.payload)
    }
  }
})

export const { setBlogs, sortBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  let blogs
  return async dispatch => {
    blogs = await apiBlogs.getAll()
    if (blogs){
      console.log(blogs.length,'blogs were loaded')
      blogs = listHelper.sortByLikes(blogs)
    }
    dispatch(setBlogs(blogs))
  }
}


export const createBlog = (newBlog, user) => {
  return async dispatch => {
    try {
      await apiBlogs.create(newBlog)
      const blogs = await apiBlogs.getAll()
      dispatch(setBlogs(blogs))
      const addedBlog = blogs.find(b => b.title === newBlog.title)
      dispatch(setUser({ ...user, blogs:user.blogs.concat(addedBlog.id) }))
      dispatch(
        setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`,true,5)
      )
    } catch (error) {
      dispatch(
        setNotification(`error adding new blog ${newBlog.title} by ${newBlog.author}`,false,5)
      )
      console.error(error)
    }
  }
}


export default blogSlice.reducer