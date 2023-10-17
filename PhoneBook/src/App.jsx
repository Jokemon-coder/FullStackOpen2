import { useEffect, useState } from 'react'
import ContactForm from './Components/ContactForm'
import Contacts from './Components/Contacts'
import Filter from './Components/Filter'
import notes from './Services/notes'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")

  const GetAllContacts = () => {
    notes.GetAll().then((personsData) => {
      setPersons(personsData);
      console.log(persons);
    });
  }

  const AddNewContact = (newContact) => {
    if(persons.filter(person => person.id === newContact.id))
    {
      const changedNewContact = {...newContact, id: newContact++}
      notes.AddContact(changedNewContact).then(() => {
        GetAllContacts();
      }).catch((e) => {
        console.log(e.response.data);
      })
    }
    else
    {
      notes.AddContact(newContact).then(() => {
        GetAllContacts();
      }).catch((e) => {
        console.log(e.response.data);
      })
    }
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
      AddNewContact(nameObject);
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

  const DeleteContact = (contactId) => {
    notes.GetAll();
    const contactUrl = `http://localhost:3000/persons/${contactId}`;
    persons.forEach((person) => {
      //console.log(person);
    })
    const contact = persons.find(n => n.id === contactId);
    //console.log(contact);

    notes.DeleteContact(contactId).then(() => {
      notes.GetAll().then((res => {
        console.log(res);
        setPersons(res);
      }))
      
    })}

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
      <div key={f.id}>
        <p>{f.name} {f.number}</p><button onClick={() => DeleteContact(f.id)}>Delete</button>
      </div>
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