import { createSlice } from '@reduxjs/toolkit'
import apiUsers from '../services/apiUsers'
import apiBlogs from '../services/apiBlogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name:'user',
  initialState:null,
  reducers:{
    setUser(state,action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const userLogin = (userData) => {
  return async dispatch => {
    try {
      const user = await loginService(userData)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      apiBlogs.setToken(user.token)
      dispatch(setUser(user))
    } catch {
      console.log('error in handle login')
      dispatch(setNotification('Wrong username or password', false, 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer