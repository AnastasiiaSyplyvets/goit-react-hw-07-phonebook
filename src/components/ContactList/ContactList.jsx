import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  // selectFilter,
  selectVisibleContacts,
} from '../../redux/selectors';

import css from './ContactList.module.css';

//NEW imports
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/operations';
import * as contactOperations from '../../redux/operations';

// Old code

export const Contact = () => {
  // const filterRedux = useSelector(selectFilter);
  const contactsRedux = useSelector(selectContacts);
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  console.log(contactsRedux);

  useEffect(() => {
    dispatch(fetchContacts());
    console.log('object');
  }, [dispatch]);

  if (!contactsRedux) {
    return;
  }

  console.log('hello');
  console.log(contactsRedux);

  // const filterContacts = () => {
  //   const normalizedFilter = filterRedux.filter.toLowerCase().trim();

  //   return contactsRedux.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedFilter)
  //   );
  // };

  // const visibleContacts = filterContacts();

  const handleDeleteBtn = id => {
    dispatch(contactOperations.deleteContact(id));
  };

  return (
    <ul className={css.listCover}>
      {contacts.map(contact => {
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
