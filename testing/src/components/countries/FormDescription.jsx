const FormDescription = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
            <div>
                Description:<br/>
                <textarea value={props.newDescription} onChange={props.handleNewDescription}>
                    {props.newDescription}
                </textarea>
            </div>
            <div>
                Visited: 
                <input type="checkbox" checked={props.checked} onChange={props.handleChecked}/>
            </div>
            <button type="submit">save</button>
        </form>
    )
}

export default FormDescription