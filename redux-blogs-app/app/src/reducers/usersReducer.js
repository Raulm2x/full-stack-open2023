import { createSlice } from '@reduxjs/toolkit'
import apiUsers from '../services/apiUsers'

const usersSlice = createSlice({
  name:'users',
  initialState:[],
  reducers:{
    setUsers(state,action){
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await apiUsers.getAll()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer

