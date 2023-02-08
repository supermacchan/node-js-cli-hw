const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');
console.log(contactsPath);

// Добавь функции для работы с коллекцией контактов. 
// В функциях используй модуль fs и его методы readFile() и writeFile()
// Сделай экспорт созданных функций через module.exports

// TODO: задокументировать каждую функцию
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
        const newContact = {
            id: `${parsedData.length + 1}`,
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