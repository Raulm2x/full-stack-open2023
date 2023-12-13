const Persons = ({person, onClick}) => (
    <li>{person.name} {person.number} 
        <button onClick={onClick}>delete</button>
    </li>
)

export default Persons