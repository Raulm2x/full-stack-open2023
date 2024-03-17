import { createSlice } from '@reduxjs/toolkit'
import apiBlogs from '../services/apiBlogs'
import listHelper from '../../../utils/list_helper'


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

export default blogSlice.reducer