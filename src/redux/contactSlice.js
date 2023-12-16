import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addNewContact,
  deleteContact,
} from '../redux/operations';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addNewContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload); // state.contacts.items?
      })
      .addCase(addNewContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },
});

export const contactsReducer = contactSlice.reducer; // to leave this for new code
