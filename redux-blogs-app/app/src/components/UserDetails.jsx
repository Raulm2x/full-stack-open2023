import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDetails = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  if (!user){
    return <div>Loading user info...</div>
  }

  const userBlogs = blogs.filter(blog => user.blogs.some(b => b.id === blog.id))

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>Added Blogs</h3>
      {userBlogs ? (
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <div>This user has not posted any blogs yet</div>
      )}
    </div>
  )
}

export default UserDetails
