import { createSlice } from '@reduxjs/toolkit'
import apiUsers from '../services/apiUsers'
import apiBlogs from '../services/apiBlogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name:'user',
  initialState:[],
  reducers:{
    setUser(state,action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const userLogin = (userData) => {
  return async dispatch => {
    const user = await loginService.login(userData)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    apiBlogs.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser([]))
    //setCurrentUser(null)
    //setUsers([])
  }
}

export default userSlice.reducer