import React from "react";

const Country = ({country}) => {

    console.log(country.concat())
    return (
        <>
        <h1>{country.name}</h1>
        </>
    )
}

export default Country;