import { useSelector } from 'react-redux'

const Notification = () => {

  const { message, type } = useSelector(notification => {
    return notification
      ? { message: notification.content, type: notification.type }
      : { message: false, type: false }
  })

  const show = type? 'rgb(134, 205, 72)': 'rgb(224, 51, 51)'

  const estilo = {
    color : show,
  }

  if (!message) {
    return null
  }

  return (
    <div className='confirmation' style={estilo}>
      {message}
    </div>
  )
}

export default Notification