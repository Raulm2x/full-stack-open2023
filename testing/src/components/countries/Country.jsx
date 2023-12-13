const Country = ({country}) => (
    <li>
        <h3>{country.name}</h3>
        Continent: {country.continent}
        <p>Description: {country.description}</p> 
    </li>
)

export default Country