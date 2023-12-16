import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addNewContact } from '../../redux/operations'; //new
// import { addNewContact1 } from '../../redux/contactSlice'; //old

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './ContactForm.module.css';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactsRedux = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }

    // const textValue = event.target;
    // console.log(textValue);
    // return textValue;
  };

  const handleFormReset = () => {
    setName('');
    setNumber('');
  };

  const handleFormSubmit = event => {
    // event.preventDefault();
    // const inputName = event.target.elements.name.value;
    // const inputNumber = event.target.elements.number.value;
    // const form = event.target;

    // console.log(inputName);
    // console.log(inputNumber);
    // dispatch(addTask(event.target.elements.text.value));
    // form.reset();

    event.preventDefault();
    setName(name);
    setNumber(number);

    console.log({ name, number });
    createContact({ name, number });

    handleFormReset();
  };

  const createContact = data => {
    console.log(contactsRedux.contacts.items);
    if (
      contactsRedux.contacts.items.find(
        contact => contact.name === data.name && contact.number === data.number
      )
    ) {
      toast.error('Such contact exists!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      console.log(data);
      dispatch(addNewContact(data));

      toast.success('Contact added!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className={css.labelName} htmlFor="">
        Name
        <input
          className={css.input}
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.labelName} htmlFor="">
        Number
        <input
          className={css.input}
          type="tel"
          value={number}
          name="number"
          onChange={handleInputChange}
        ></input>
      </label>
      <button className={css.addBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Form;
