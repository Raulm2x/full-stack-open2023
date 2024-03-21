import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShowBlogs = () => {
  const blogs = useSelector((state) => state.blogs)

  if (!blogs) {
    return <div>loading blogs...</div>
  }

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowBlogs
