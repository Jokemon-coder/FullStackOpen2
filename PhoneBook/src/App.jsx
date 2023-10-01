import { useEffect, useState } from 'react'
import ContactForm from './Components/ContactForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas",
      number: "0402731865",
      id: 1
    },
    { name: "Petri Kallio",
    number: "0456872881",
    id: 2
    },
    { name: "Tomi Kulta",
    number: "0405832616",
    id: 3
    },
    { name: "Anni Suonpää",
    number: "0408970032",
    id: 4
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

  const [filtered, setFiltered] = useState(persons);

  const filterContacts = (e) => {
    let filter = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFiltered(filter);
  }

  let mappedFiltered = filtered.map((f) => {
    return (
      <p key={f.id}>{f.name} {f.number}</p>
    )
  })

  useEffect(() => {
    setFiltered(persons);
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          <h2>Filter contacts</h2>
          <input onChange={filterContacts}></input>
        </div>
      <ContactForm addNewName={addNewName} onChange={handleChange}/>
      <h2>Numbers</h2>
      {mappedFiltered}
    </div>
  )

  /**
   * 
   *       <form onSubmit={addNewName}>
        <div>
        <h2>Add a contact</h2>
        name: <input id='nameInput' onChange={handleChange}/> number: <input id='numberInput' onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
   */

}

export default App