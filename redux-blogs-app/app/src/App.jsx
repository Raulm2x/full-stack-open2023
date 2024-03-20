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
//import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import ShowBlogs from './components/ShowBlogs.jsx'
import LogOutButton from './components/LogOutButton.jsx'
import ShowUsers from './components/ShowUsers.jsx'
import Menu from './components/Menu.jsx'
import UserDetails from './components/UserDetails.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'
import { loadUsers } from './reducers/usersReducer'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  },[])

  const match = useMatch('/users/:id')
  const userDetails = match
    ? users.find(user => user.id === match.params.id)
    : null

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
        <Route path="/users/:id" element={<UserDetails user={userDetails}/>} />
        <Route path="/create" element={<BlogForm/>}/>
      </Routes>
    </div>
  )
}

export default App