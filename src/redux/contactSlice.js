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
        console.log(action.payload);
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
        console.log(state.contacts.items);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addNewContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        console.log(action.payload);
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

// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//   },
//   reducers: {
//     addNewContact1: {
//       prepare(contact) {
//         return {
//           payload: {
//             ...contact,
//             id: nanoid(),
//           },
//         };
//       },
//       reducer(state, action) {
//         state.contacts = [...state.contacts, action.payload];
//       },
//     },

//     deleteContact1(state, action) {
//       state.contacts = [...state.contacts].filter(
//         contact => contact.id !== action.payload
//       );
//     },
//   },
// });

// export const { addNewContact1, deleteContact } = contactsSlice.actions;
