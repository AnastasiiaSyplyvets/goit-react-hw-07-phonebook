import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts.contacts.items;
export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (items, filter) => {
    const normalizedFilter = filter.filter.toLowerCase().trim();

    return items.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);
