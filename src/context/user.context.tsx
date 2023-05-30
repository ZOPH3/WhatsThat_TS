import { createContext } from 'react';
import { User } from '../types/api.schema.types';

const initialState = {
  user: {
    user_id: -1,
    first_name: '',
    last_name: '',
    email: '',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setUser: (value: User) => {},
};

export const UserContext = createContext(initialState);
