import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => {
  console.log('selectContacts', state.contacts.items);
  return state.contacts.items;
};
export const selectFilter = state => state.filter;

console.log(selectContacts);

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    console.log(contacts);

    const normalizedFilter = filter.filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
