const LikeButton = (props) => {
  const { blog, OnClick, liked } = props

  let text = liked ? 'Dislike' : 'Like'
  return (
    <button
      onClick={() => OnClick(blog, !liked)}
      className={`py-2 px-4 rounded ${
        liked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      } hover:opacity-75`}
    >
      {text}
    </button>
  )
}

export default LikeButton
