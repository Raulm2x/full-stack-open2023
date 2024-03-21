import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogOutButton from './LogOutButton'

const Menu = () => {
  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      {!user &&
        <Link style={padding} to='/login'>
          Login
        </Link>
      }
      <Link style={padding} to='/'>
        Blogs
      </Link>
      {user &&
        <>
          <Link style={padding} to='/users'>
            Users
          </Link>
          <Link style={padding} to='/create'>
            Create
          </Link>
        </>
      }
      <Link style={padding} to='/about'>
        About
      </Link>
      {user &&
        <>
          {user.username} logged in{' '}
          <LogOutButton/>
        </>
      }
    </div>
  )
}

export default Menu
