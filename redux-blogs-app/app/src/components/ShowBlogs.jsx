import BlogDetails from './BlogDetails'
import { useSelector } from 'react-redux'

const ShowBlogs = () => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs) {
    return <div>loading blogs...</div>
  }

  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog, index) => (
          <BlogDetails
            key={index}
            blog={blog}
          />
        ))}
      </ul>
    </div>
  )
}

export default ShowBlogs
