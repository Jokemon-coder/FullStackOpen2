import React, { useEffect, useState } from "react";

const Country = ({country, getGeo, weather}) => {

    const [temp, setTemp] = useState();
    const [wind, setWind] = useState();

    useEffect(() => {
        if(country !== false)
        {
            getGeo(country.capital, country.cca2 ,5);
            setTemp(undefined);
            setWind(undefined);
        }
    }, [country])

    useEffect(() => {
        if(weather !== undefined)
        {
            setTemp(weather.main.temp);
            setWind(weather.wind);
        }
    }, [weather])


    if(country !== false)
    {
        //const [temp, setTemp] = useState(weather.temp);
        //const [wind, setWind] = useState(weather.wind);

        /*if(weather !== undefined)
        {*/
            //setTemp(weather.main.temp);
            //setWind(weather.main.wind);
        //}
        //Set up the languages and map through them
        const languages = Object.values(country.languages); 
        const mappedLanguages = languages.map((lang) => {
            return (
                <li key={languages.indexOf(lang)}>{lang}</li>
            )
        })

        //Set up the capitals and map through them
        const capitals = Object.values(country.capital);
        const mappedCapitals = capitals.map((capital) => {
            return (
                <li key={capitals.indexOf(capital)}>{capital}</li>
            )
        })

        //If there is a single capital, set the unmapped capitals as the value. Otherwise set the mapped capitals as the value
        const capitalDisplay = capitals.length === 1 ? {text: "Capital:", capital: capitals} : {text: "Capitals:", capital: mappedCapitals}

        

        return (
            <>
            <h1>{country.name.common}</h1>
            <p>{capitalDisplay.text} {capitalDisplay.capital}</p>
            <p>Area: {country.area}</p>
            <p>Languages:</p>
            <ul>
                {mappedLanguages}
            </ul>
            <img style={{border: "4px solid black"}} src={country.flags.png} alt={country.flags.alt}></img>
            <h2>Weather in {capitals[0]}</h2>
            <p>{temp === undefined ? "Loading..." : `${temp} Celcius`}</p>
            <p>{wind === undefined ? "Loading..." : `${wind.speed} M/s`}</p>
            </>
        )
    }
}

export default Country;