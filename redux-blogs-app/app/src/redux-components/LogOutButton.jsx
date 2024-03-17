import { userLogout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const logOut = () => dispatch(userLogout())

  return (
    <>
      <button onClick={logOut}> Log out </button>
    </>
  )
}

export default LogOutButton
