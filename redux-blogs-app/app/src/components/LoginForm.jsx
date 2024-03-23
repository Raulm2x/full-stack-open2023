import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = (event) => setUsername(event.target.value)

  const onChangePassword = (event) => setPassword(event.target.value)

  const handleLogin = async (userData) => {
    try {
      dispatch(userLogin(userData))
    } catch {
      console.log('error in handle login')
      dispatch(setNotification('Wrong username or password', false, 5))
    }
  }

  const login = (event) => {
    event.preventDefault()
    const userData = {
      username,
      password,
    }
    handleLogin(userData)
    setUsername('')
    setPassword('')

    navigate('/')
  }

  return (
    <form
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      onSubmit={login}
    >
      <h2 className='block text-gray-700 text-lg font-bold mb-2'>Login</h2>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='username'
        >
          Username
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='username'
          type='text'
          placeholder='Username'
          value={username}
          onChange={onChangeUsername}
        />
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='password'
        >
          Password
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
          id='password'
          type='password'
          placeholder='******************'
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
