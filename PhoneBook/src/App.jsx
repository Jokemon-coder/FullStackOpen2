import { useEffect, useState } from 'react'
import ContactForm from './Components/ContactForm'
import Contacts from './Components/Contacts'
import Filter from './Components/Filter'
import notes from './Services/notes'
import Notification from './Components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")

  const [notificationMessage, setNotificationMessage] = useState("");
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false);

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
      setNotificationMessage(`${newName} has been added to the list of contacts.`)
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

            setNotificationMessage(`${newName}'s number has been updated.`)
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
    
    const contact = persons.find(n => n.id === contactId);
      notes.DeleteContact(contactId).then(() => {
        notes.GetAll().then((res => {
          console.log(res);
          setPersons(res);
          setNotificationMessage(`${contact.name} has been deleted.`)
        }))
      }).catch(e => {
        console.log(e);
        setNotificationMessage(`${contact.name} no longer exists in the database.`)
        setError(true);
      })
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
      <div key={f.id}>
        <p>{f.name} {f.number}</p><button onClick={() => DeleteContact(f.id)}>Delete</button>
      </div>
    )
  })

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

  //Set filtered as persons whenever a new contact is added
  useEffect(() => {
    setFiltered(persons);

    //Whenever the notificationMessage is set and it is not empty, change visibility for notification and change it back after 5 seconds
    if(notificationMessage !== "")
    {
      setVisible(true);
      setTimeout(() => {
        setVisible(false)
        setError(false)
        setNotificationMessage("")
      }, 5000)
    }

  }, [persons, notificationMessage])

  useEffect(() => {
    GetAllContacts();
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={FilterContacts}/>
      <Notification message={notificationMessage} visible={visible} error={error}></Notification>
      <ContactForm addNewName={AddNewName} onChange={HandleChange}/>
      <Contacts contacts={mappedFiltered}/>
    </div>
  )
}

export default App