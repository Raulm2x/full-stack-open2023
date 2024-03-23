import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogOutButton from './LogOutButton'

const Menu = () => {
  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5,
  }
  return (
    <div className="bg-gray-700 p-3">
      <nav className="flex justify-between items-center ">
        <Link to='/'>
          <h1 className='text-green-600 text-center text-bold font-bold text-2xl'>
            Blog App
          </h1>
        </Link>
        {!user && (
          <Link className="text-white hover:text-gray-300" to='/login'>
            Login
          </Link>
        )}
        {user && (
          <>
            <Link className="text-white hover:text-gray-300" to='/users'>
              Users
            </Link>
            <Link className="text-white hover:text-gray-300" to='/create'>
              Create
            </Link>
          </>
        )}
        <Link className="text-white hover:text-gray-300" to='/about'>
          About
        </Link>
        {user && (
          <div className="text-white">
            {user.username} logged in <LogOutButton />
          </div>
        )}
      </nav>
    </div>
  )
}

export default Menu
