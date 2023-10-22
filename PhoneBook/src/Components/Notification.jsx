import React from "react";

const Notification = ({message, visible}) => {

    if(visible === true)
    {

    return(
        <div className="notificationMessage">
        <h2>{message}</h2>
        </div>
    )
    }
}

export default Notification;