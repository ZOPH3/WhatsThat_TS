/* eslint-disable camelcase */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { TUser } from '../../types/TSchema';

interface IContactsContext {
  contacts: any[];
  blocked: any[];
  dispatcher?: any;
}

const initialState: IContactsContext = {
  contacts: [],
  blocked: [],
};

export const actionTypes = {
  ADD_CONTACT: 'ADD_CONTACT',
  REMOVE_CONTACT: 'REMOVE_CONTACT',
  BLOCK_USER: 'BLOCK_USER',
  SET_CONTACTS: 'SET_CONTACTS',
  SET_BLOCKED: 'SET_BLOCKED',
};

const ContactsReducer = (state: IContactsContext, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case actionTypes.REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.user_id !== action.payload.user_id),
      };
    case actionTypes.BLOCK_USER:
      return {
        ...state,
        blocked: [...state.blocked, action.payload],
        contacts: state.contacts.filter((contact) => contact.user_id !== action.payload.user_id),
      };
    case actionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case actionTypes.SET_BLOCKED:
      return {
        ...state,
        blocked: action.payload,
      };
    default:
      return state;
  }
};

const ContactsContext = createContext(initialState);

/**
 * @description Provider for ContactsContext
 */
function ContactsProvider({ children }: any) {
  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  const handleAddContact = (user: TUser) => {
    dispatch({ type: actionTypes.ADD_CONTACT, payload: user });
  };

  const handleRemoveContact = (user_id: number) => {
    dispatch({ type: actionTypes.REMOVE_CONTACT, payload: user_id });
  };

  const handleBlockUser = (user_id: number) => {
    dispatch({ type: actionTypes.BLOCK_USER, payload: user_id });
  };

  const setContacts = (contacts: TUser[]) => {
    dispatch({ type: actionTypes.SET_CONTACTS, payload: contacts });
  };

  const setBlocked = (blocked: TUser[]) => {
    dispatch({ type: actionTypes.SET_BLOCKED, payload: blocked });
  };

  // TODO: Move the functions outside of the provider because when the state is changed the functions are re-created (this is causing the re-render of the component)
  // Used Memo in order to avoid the re-render of the component - Havent checked if it works
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = useMemo(
    () => ({
      contacts: state.contacts,
      blocked: state.blocked,
      dispatcher: {
        handleAddContact,
        handleRemoveContact,
        handleBlockUser,
        setContacts,
        setBlocked,
      },
    }),
    [state.blocked, state.contacts]
  );

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>;
}

const useContactContext = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContactContext must be used within a ContactsProvider');
  }
  return context;
};

export { ContactsProvider, useContactContext };
