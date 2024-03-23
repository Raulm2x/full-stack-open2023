import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  useNavigate,
  useMatch
} from 'react-router-dom'

import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import ShowBlogs from './components/ShowBlogs.jsx'
import ShowUsers from './components/ShowUsers.jsx'
import UserDetails from './components/UserDetails.jsx'
import BlogDetails from './components/BlogDetails.jsx'
import About from './components/About.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'
import { loadUsers } from './reducers/usersReducer'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

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
    <div className="p-2">
      <Header/>

      <Routes>
        <Route path="/" element={<ShowBlogs/>}/>
        <Route path="/blogs/:id" element={<BlogDetails blog={blogDetails}/>}/>

        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/users" element={<ShowUsers/>}/>
        <Route path="/users/:id" element={<UserDetails user={userDetails}/>} />

        <Route path="/create" element={<BlogForm/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App