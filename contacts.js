const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath)
    .then (data => console.log(JSON.parse(data.toString())))
    .catch (error => console.error(error.message));
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath)
    .then (data => {
        const parsedData = JSON.parse(data.toString());
        const locatedContact = parsedData.filter(contact => contact.id === contactId);
        console.log(locatedContact);
    })
    .catch (error => console.error(error.message));
  }
  
  function removeContact(contactId) {
    fs.readFile(contactsPath)
    .then (data => {
        const parsedData = JSON.parse(data.toString());
        const filteredContacts = parsedData.filter(contact => contact.id !== contactId);
        fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    })
    .catch (error => console.error(error.message));
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath)
    .then (data => {
        const parsedData = JSON.parse(data.toString());
        const lastId = parsedData[parsedData.length - 1].id;
        console.log(parsedData[parsedData.length - 1].id);
        const newContact = {
            id: `${Number(lastId) + 1}`,
            name,
            email,
            phone
        };
        const updateContacts = parsedData.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(parsedData));
    })
    .catch (error => console.error(error.message));
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }