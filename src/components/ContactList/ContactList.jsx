import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import css from './ContactList.module.css';

//NEW imports
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/operations';
import * as contactOperations from '../../redux/operations';

// Old code

export const Contact = () => {
  const filterRedux = useSelector(state => state.filter);
  const contactsRedux = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  //new code

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //end

  const filterContacts = () => {
    const normalizedFilter = filterRedux.filter.toLowerCase().trim();

    return contactsRedux.contacts.items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = filterContacts();

  const handleDeleteBtn = id => {
    dispatch(contactOperations.deleteContact(id));
  };

  return (
    <ul className={css.listCover}>
      {visibleContacts.map(contact => {
        return (
          <li className={css.contactList} key={contact.id}>
            <p className={css.contactText}>
              {contact.name} : {contact.number}
            </p>
            <button
              className={css.deleteBtn}
              type="button"
              onClick={() => {
                handleDeleteBtn(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};