const PersonForm = (props) => {
    const onSubmit = props.onSubmit
    const name = props.name
    const onChangeName = props.onChangeName
    const number = props.number
    const onChangeNumber = props.onChangeNumber

    return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onChangeName}  />
        </div>
        <div>
          number: <input value={number} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm