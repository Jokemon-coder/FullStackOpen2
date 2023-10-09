import { useEffect, useState } from 'react'
import ContactForm from './Components/ContactForm'
import Contacts from './Components/Contacts'
import Filter from './Components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")

  const GetAllContacts = () => {
    axios.get("http://localhost:3000/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
  })
  }
  useEffect(() => {
    GetAllContacts();
  }, [])

  const HandleChange = (e) => {
    //Distinguish nameInput and numberInput from eachother
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

  const AddNewName = (e) => {
    e.preventDefault();
    const nameObject = {
      name: newName,
      number: newNum,
      id: persons.length+1
    }
    
    //If some returns false and newName/newNum is not empty, proceed
    //Also check if numberInput actually contains numbers instead of letters
    if((!persons.some(e => e.name === newName) && newName !== "") &&
    (!persons.some(e => e.number === newNum) && newNum !== "") && 
    (/^\d+$/.test(newNum)))
    {
      console.log(nameObject);
      console.log(persons);
      axios.post("http://localhost:3000/persons", nameObject).then((response) => {
        console.log(response);
      }).then(() => {
        GetAllContacts();
      })
      setNewName("");
      e.target.reset();
      
    }
    else
    {
      if(newName !== "" && newNum !== "")
      {
        (/^\d+$/.test(newNum)) ? 
        alert("This contact can already be found") :
        alert("Only enter numbers");
      }
      else
      alert("You cant enter an empty entry");
    }
  
  }

  const [filtered, setFiltered] = useState(persons);

  const FilterContacts = (e) => {
    /*Get filtered contacts based on user input and set
    them as the state of filtered
    */
    let filter = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFiltered(filter);
  }

  let mappedFiltered = filtered.map((f) => {
    return (
      <p key={f.id}>{f.name} {f.number}</p>
    )
  })

  //Set filtered as persons whenever a new contact is added
  useEffect(() => {
    setFiltered(persons);
  }, [persons])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={FilterContacts}/>
      <ContactForm addNewName={AddNewName} onChange={HandleChange}/>
      <Contacts contacts={mappedFiltered}/>
    </div>
  )
}

export default App