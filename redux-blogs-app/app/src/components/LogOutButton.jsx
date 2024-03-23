import { userLogout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LogOutButton = () => {
  const dispatch = useDispatch()
  const logOut = () => dispatch(userLogout())

  return (
    <>
      <button
        onClick={logOut}
        className="h-12 min-w-[8rem] rounded-lg border-2 border-red-600 bg-red-500 text-emerald-50 shadow-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-600"
      >
         Log out
      </button>
    </>
  )
}

export default LogOutButton
