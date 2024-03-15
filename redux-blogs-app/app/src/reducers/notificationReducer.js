import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    setMessage(state,action){
      return action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (content, type, time) => {
  return async dispatch => {
    dispatch(setMessage({ content, type }))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, time*1000)
  }
}

export default notificationSlice.reducer