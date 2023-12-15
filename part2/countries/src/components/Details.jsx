import { useState } from "react"
import Weather from "./Weather"

const Details = ({country, all}) => {
    
    const [show, setShow] = useState(all)

    const handleShow = () => {
        setShow(!show)
        console.log('show is now', !show)
    }

    const buttonShow = (
        <button onClick={handleShow}>
            show
        </button>
    )

    const buttonHide = (
        <button onClick={handleShow}>
            hide
        </button>
    )

    const details = (
        <div className="details">
            Capital: {country.capital ?? 'N/A'}<br/>
            Area: {country.area ?? 'N/A'} km2
            <h3>Languages</h3>
            {country.languages && 
            <ul>
                {Object.values(country.languages).map((language,index) => {
                    return (
                        <li key={index}> {language} </li>
                    )
                }
                )}
            </ul> 
            }
            <p>
                <img src={country.flags.png ?? country.flags.svg}
                alt={`${country.name} Flag`} style={{ width: '150px', height: 'auto' }} />
            </p>
            <Weather country={country}/>
        </div>
    )

    return (
        <div>
            {country.name.common && 
            <h2>
                {country.name.common} {show ? buttonHide:buttonShow}
            </h2>
            }
            {show? details:null}
        </div>
    )
}

export default Details

