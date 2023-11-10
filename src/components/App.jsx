import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { nanoid } from 'nanoid';
import { Contact } from './Contact/Contact';
import { Filter } from './Filter/Filter';
import style from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('keyContacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
    return parsedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('keyContacts', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = data => {
    const { name, number } = data;
    if (
      contacts.find(
        contact => contact.name === name && contact.number === number
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);
  };

  const handleFilterChange = event => {
    const inputFilter = event.target.value;
    setFilter(inputFilter);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
      contact.number.includes(filter)
    );
  });

  return (
    <div className={style.wrap}>
      <h1 className={style.title}>Phonebook</h1>
      <Form handleAddContact={handleAddContact} />
      <h2 className={style.titleContact}>Contacts</h2>
      <Filter onChange={handleFilterChange} filter={filter} />
      <Contact
        contacts={filterContacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
