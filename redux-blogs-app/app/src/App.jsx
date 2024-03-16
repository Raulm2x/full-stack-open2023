import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './redux-components/Notification.jsx'
import LoginForm from './redux-components/LoginForm.jsx'
import Togglable from './redux-components/Togglable.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)
  useEffect(() => {
    dispatch(initializeBlogs())
  },[])

  //-----Show Components-----
  const showLoginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Log in'>
          <LoginForm/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <h2>Redux is being implemented..</h2>
      <Notification/>
      {!user && showLoginForm()}
    </div>
  )
}

export default App