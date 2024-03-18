import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate,
  useMatch
} from 'react-router-dom'

import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import ShowBlogs from './components/ShowBlogs.jsx'
import LogOutButton from './components/LogOutButton.jsx'
import ShowUsers from './components/ShowUsers.jsx'
import Menu from './components/Menu.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'
import { loadUsers } from './reducers/usersReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
      <header>
        <Menu/>
        <div>
          <h1>Welcome!</h1>
          {user &&
            <div>
              {user.username} logged in
              <LogOutButton/>
            </div>
          }
        </div>
        <Notification/>
      </header>

      <Routes>
        <Route path="/" element={<ShowBlogs/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/users" element={<ShowUsers/>}/>
        <Route path="/create" element={<BlogForm/>}/>
      </Routes>
    </div>
  )
}

export default App