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
import BlogDetails from './components/BlogDetails.jsx'
import About from './components/About.jsx'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  },[])

  //Blogs
  const matchBlogs = useMatch('/blogs/:id')
  const blogDetails = matchBlogs
    ? blogs.find(blog => blog.id === matchBlogs.params.id)
    : null

  //Users
  const match = useMatch('/users/:id')
  const userDetails = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <header>
        <Menu/>
        <div>
          <h1>Blog App</h1>
          {user &&
            <div>
              {user.username} logged in
              <LogOutButton/>
            </div>
          }
        </div>
        <Notification/>
        <br/>
      </header>

      <Routes>
        <Route path="/" element={<ShowBlogs/>}/>
        <Route path="/blogs/:id" element={<BlogDetails blog={blogDetails}/>}/>

        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/users" element={<ShowUsers/>}/>
        <Route path="/users/:id" element={<UserDetails user={userDetails}/>} />

        <Route path="/create" element={<BlogForm/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>

      <footer>
        <br/>
        Part 7 from{' '}
        <a href='https://fullstackopen.com/en' target="_blank" rel="noopener noreferrer">
        https://fullstackopen.com
        </a>
      </footer>
    </div>
  )
}

export default App