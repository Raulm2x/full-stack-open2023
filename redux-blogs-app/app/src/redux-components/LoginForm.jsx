import { useState } from 'react'
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = (event) => setUsername(event.target.value)

  const onChangePassword = (event) => setPassword(event.target.value)

  const handleLogin = async (userData) => {
    try {
      userLogin(userData)
      setNotification('Successfully logged in', true, 5)
    } catch (exception) {
      console.log('error in handle login')
      setNotification('Wrong username or password', false, 5)
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
  }

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={onChangeUsername}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          id='password'
          onChange={onChangePassword}
        />
      </div>
      <button id='loginButton' type='submit'>login</button>
    </form>
  )
}

export default LoginForm