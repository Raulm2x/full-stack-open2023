import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import ShowBlogs from './components/ShowBlogs.jsx'
import LogOutButton from './components/LogOutButton.jsx'
import ShowUsers from './components/ShowUsers.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'
import { loadUsers } from './reducers/usersReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  //console.log('user:',user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
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

  const showBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Add blog'>
          <BlogForm/>
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
      <div>
        {user &&
          <div>
            {user.username} logged in
            <LogOutButton/>
            {showBlogForm()}
          </div>
        }
        <br/>
        <ShowBlogs/>
        {user && <ShowUsers/>}
      </div>
    </div>
  )
}

export default App