import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShowBlogs = () => {
  const blogs = useSelector((state) => state.blogs)

  if (!blogs) {
    return <div>loading blogs...</div>
  }

  return (
    <div className='mt-16 px-4 sm:px-8 max-w-5xl m-auto'>
      <h1 className='text-center font-semibold text-2xl mb-4'>Blog List</h1>
      <ul className='space-y-4'>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className='px-4 py-2 bg-white hover:bg-blue-100 hover:text-blue-900 border rounded shadow transition-all duration-300 ease-in-out'
          >
            <Link
              to={`/blogs/${blog.id}`}
              className='text-sm text-center block mt-4 hover:underline'
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowBlogs
