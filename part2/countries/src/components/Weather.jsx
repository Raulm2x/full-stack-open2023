import React, { useEffect } from 'react';

const Weather = ({ country }) => {
    const apiKey = "import.meta.env.VITE_SOME_KEY"; //this doesn't work: can't access property "VITE_SOME_KEY" of undefined 
    const city = country.capital ?? 'Madrid';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


    // This code was extracted from StackOverflow, there are things I don't know to use yet and I don't know how to make it work with my current knowledge.
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error('API response failed');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was an error:', error);
        }
        };

        fetchData();
    }, [url]);

    return <div>
        <h3> Weather </h3>
        <p>Couldn't do this 😣</p>
    </div>;
    };

export default Weather;



