import React from "react";

const Notification = ({message, visible, error}) => {

    if(visible === true)
    {

    /*Giving inline style using conditional ternary
    operator
    */
    return(
        <div className="notificationMessage">
        <h2 style={error ? {color:"red"} : {color:"white"}}>{message}</h2>
        </div>
    )
    }
}

export default Notification;