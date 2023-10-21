import { useEffect, useState } from 'react'
import ContactForm from './Components/ContactForm'
import Contacts from './Components/Contacts'
import Filter from './Components/Filter'
import axios from 'axios'
import notes from './Services/notes'

const App = () => {
  const url = `http://localhost:3000/persons/`;

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
    let checkNum = /^\d+$/.test(newNum);
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
    (checkNum === true))
    {
      console.log(nameObject);
      console.log(persons);
      AddNewContact(nameObject);
      setNewName("");
      e.target.reset();
      //Return to prevent final else from giving an alert
      return;
      
    }
    //If a number that already exists is found, inform user
    if(persons.some(e => e.number === newNum) && newNum !== "" && newName !== "")
    {
      if(checkNum === true)
      {
        window.alert(`${newNum} is already in use. Choose a different number.`) 
      }
    }

    /*If a user is found by name to already exist,
      inform the user and ask them to replace the number
      that corresponds to that user with the new one
    */
    else if(persons.some(e => e.name === newName) && newName !== "" && newNum !== "")
    {
      if((checkNum) === true)
      {
        if(window.confirm(`${newName} is already a contact, would you like to replace the old number with the new one?`)) 
        {
          notes.GetAll().then((res) => {
            const existingContact = res.find((e) => e.name === newName);
            const contactData = {
              name: newName, 
              number: newNum, 
              id: existingContact.id
            }
            notes.EditContact(existingContact.id, contactData);
            GetAllContacts();
            setNewName("");
            setNewNum("");
            e.target.reset();
          })
        }
      } 
    }
    else
    {
      alert("You cant enter an empty entry.");
    }
  }

  const DeleteContact = (contactId) => {
    notes.GetAll();
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