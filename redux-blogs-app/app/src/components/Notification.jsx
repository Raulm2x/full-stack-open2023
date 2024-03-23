import { useSelector } from 'react-redux'

const Notification = () => {

  const { message, type } = useSelector(state => {
    return state.notification
      ? { message: state.notification.content, type: state.notification.type }
      : { message: false, type: false }
  })

  if (!message) {
    return null
  }

  return (
    <div className={`p-4 rounded-lg text-white ${type ? 'bg-green-500' : 'bg-red-500'} transition-all duration-300 ease-in-out`}>
      {message}
    </div>
  )
}

export default Notification
