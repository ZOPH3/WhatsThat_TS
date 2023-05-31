export const initialState = {
  user: {
    user_id: -1,
    first_name: '',
    last_name: '',
    email: '',
  },
  contacts: [],
  blocked: [],
};

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TO_CONTACTS':
      console.log('ADD_TO_CONTACTS', payload);
      return {
        ...state,
        contacts: payload.contacts,
      };
    case 'REMOVE_FROM_CONTACTS':
      console.log('REMOVE_FROM_CONTACTS', payload);
      return {
        ...state,
        contacts: payload.contacts,
      };
    case 'ADD_USER_INFO':
      console.log('ADD_USER_INFO', payload);
      return {
        ...state,
        user: payload.user,
      };
    default:
      throw new Error(`No case for rtpe ${type} found in userReducer...`);
  }
};
