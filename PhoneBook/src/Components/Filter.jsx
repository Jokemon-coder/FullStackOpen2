import React from "react";

const Filter = ({onChange}) => {

    return(
        <>
        <h2>Filter contacts</h2>
          <input onChange={onChange}></input>
        </>
    )
}

export default Filter;