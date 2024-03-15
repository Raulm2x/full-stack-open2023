import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Notifications from './redux-components/Notification.jsx'
import LoginForm from './redux-components/LoginForm.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'


const App = () => {
  const dispatch = useDispatch()

  /*
  useEffect(() => {
    dispatch(initializeBlogs())
  },[])*/

  return (
    <div>
      <h1>Redux is being implemented...</h1>
    </div>
  )
}

export default App