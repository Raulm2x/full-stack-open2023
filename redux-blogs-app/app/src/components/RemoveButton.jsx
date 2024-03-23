const RemoveButton = ({ handleRemove, blog }) => (
  <button
    onClick={() => handleRemove(blog)}
    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-200"
  >
    remove
  </button>
)

export default RemoveButton
