import React from "react";

const FilterList = ({single ,loading, mappedCountries}) => {

    //Display while data is loading
    if(loading !== true)
    {
        return (
            <p>Loading...</p>
        )
    }
    
    //Too many results
    if(mappedCountries.length > 10)
    {
        return (
            <p>
                Too many countries. Please specify.
            </p>
        )
    }

    //Show countries if there are 10 or less but also not a single one
    if(mappedCountries.length <= 10 && single === false)
    {
    return (
        <>
        {mappedCountries}
        </>
    )
    }
    
}

export default FilterList;