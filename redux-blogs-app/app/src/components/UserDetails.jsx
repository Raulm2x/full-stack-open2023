import { useSelector } from 'react-redux'

const UserDetails = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  if (!user) {
    return <div>Loading user info...</div>
  }

  const userBlogs = blogs.filter((blog) =>
    user.blogs.some((b) => b === blog.id)
  )
  console.log(user.blogs)
  console.log(userBlogs)

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-2'>
        {user.name || user.username}
      </h2>
      <h3 className='text-lg font-medium mb-4'>Added Blogs</h3>
      {userBlogs ? (
        <ul className='list-disc pl-5 space-y-2'>
          {userBlogs.map((blog) => (
            <li key={blog.id} className='text-gray-700'>
              {blog.title}
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-gray-500'>
          This user has not posted any blogs yet
        </div>
      )}
    </div>
  )
}

export default UserDetails
