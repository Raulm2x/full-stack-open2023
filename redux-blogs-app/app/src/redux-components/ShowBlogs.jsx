import BlogDetails from './BlogDetails'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const ShowBlogs = ({ OnClick, handleRemove }) => {
  const blogs = useSelector(state => state.blogs)

  if (!blogs) {
    return <div>loading blogs...</div>
  }

  return (
    <div>
      <ul>
        {blogs.map((blog, index) => (
          <BlogDetails
            key={index}
            blog={blog}
            OnClick={OnClick}
            handleRemove={handleRemove}
          />
        ))}
      </ul>
    </div>
  )
}

ShowBlogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  OnClick: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default ShowBlogs
