import { useSelector } from 'react-redux'

const Notification = () => {

  const { message, type } = useSelector(state => {
    return state.notification
      ? { message: state.notification.content, type: state.notification.type }
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