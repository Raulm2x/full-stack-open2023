import Details from "./Details"

const Countries = ({countries}) => {

    if (countries.length > 10) {
        return (
            <p>Too many matches, please specify another filter</p>
        )
    }

    return (
        <div>
        <ul>
            {countries.map((country,index) => (
                <li key={index}>
                    <Details country={country} 
                    all={countries.length >1? false: true}/>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Countries