import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ShowUsers = () => {
  const users = useSelector((state) => state.users)

  return (
    <div className='overflow-x-auto mt-6'>
      <h2 className='text-2xl font-semibold mb-2'>Users</h2>
      <table className='w-full max-w-full whitespace-nowrap rounded-lg overflow-hidden'>
        <thead className='text-sm font-semibold uppercase text-gray-700 bg-gray-100'>
          <tr>
            <th className='px-4 py-2'>User</th>
            <th className='px-4 py-2'>Blogs Created</th>
          </tr>
        </thead>
        <tbody className='text-sm font-normal text-gray-700'>
          {users.map((user) => (
            <tr key={user.id} className='hover:bg-gray-100'>
              <td className='px-4 py-2'>
                <Link
                  to={`/users/${user.id}`}
                  className='text-blue-600 hover:underline'
                >
                  {user.name || user.username}
                </Link>
              </td>
              <td className='px-4 py-2'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShowUsers
