import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value)
    console.log(newName);
  }

  const addNewName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length+1
    }
    
    if(!persons.some(e => e.name === newName))
    {
      console.log(nameObject)
      setPersons(persons.concat(nameObject))
      setNewName("");
      e.target.reset();
      
    }
    else
    {
      if(newName !== "")
      {
        alert(`${newName} can already be found`);
      }
      else
      alert("You cant enter an empty entry");
    }
  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <p key={person.id}>{person.name}</p>
        )
        })}
    </div>
  )

}

export default App