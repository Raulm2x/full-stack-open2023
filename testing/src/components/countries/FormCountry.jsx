const FormCountry = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
            <div>
                Name: 
                <input value={props.newName} onChange={props.handleNewName}/>
            </div>
            <div>
                Continent: 
                <input value={props.newContinent} onChange={props.handleNewContinent}/>
            </div>
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

export default FormCountry