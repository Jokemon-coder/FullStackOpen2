import React from "react";
import Country from "./Country";

const FilterList = ({countries, mappedCountries}) => {

    if(mappedCountries.length > 10)
    {
        return (
            <p>
                Too many countries. Please specify.
            </p>
        )
    }
    if(mappedCountries.length === 0)
    {
        return (
            <Country country={countries}/>
        )
    }
    if(mappedCountries.length <= 10)
    {
    return (
        <>
        {mappedCountries}
        </>
    )
    }
}

export default FilterList;