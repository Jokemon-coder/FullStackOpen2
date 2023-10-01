import React from "react";

const ContactForm = ({addNewName, onChange}) => {

    return(
        <>
        <form onSubmit={addNewName}>
        <div>
        <h2>Add a contact</h2>
        name: <input id='nameInput' onChange={onChange}/> number: <input id='numberInput' onChange={onChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </form>
        </>
    )
}

export default ContactForm;