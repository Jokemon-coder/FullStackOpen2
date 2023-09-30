import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",
      number: "0402731865",
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")

  const handleChange = (e) => {
    if(e.target.id === "nameInput")
    {
      setNewName(e.target.value)
      console.log(newName);
    }
    else
    {
      setNewNum(e.target.value)
      console.log(newNum)
    }
  }

  const addNewName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNum,
      id: persons.length+1
    }
    
    if((!persons.some(e => e.name === newName) && newName !== "") && (!persons.some(e => e.number === newNum) && newNum !== "") && (/^\d+$/.test(newNum)))
    {
      console.log(nameObject);
      console.log(persons);
      setPersons(persons.concat(nameObject));
      setNewName("");
      e.target.reset();
      
    }
    else
    {
      if(newName !== "" && newNum !== "")
      {
        (/^\d+$/.test(newNum)) ? alert("This contact can already be found") : alert("fuck you");
      }
      else
      alert("You cant enter an empty entry");
    }
  
  }

  /*const [showSpec, setShowSpec] = useState();

  const filterContacts = (e) => {

  }*/

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
        <h2>Add a contact</h2>
          name: <input id='nameInput' onChange={handleChange}/>
          <br/>
          number: <input id='numberInput' onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>{person.name} {person.number}</p>
        )
        })}
    </div>
  )

}

export default App