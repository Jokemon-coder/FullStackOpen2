import React from "react";

const Filter = ({onchange}) => {

    return (
        <>
        <input placeholder="Search for a country" onChange={onchange}></input>
        </>
    )
}

export default Filter;