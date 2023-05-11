import { createContext } from 'react';
import UserType from '../util/types/user.type';

const initialState = {
  user: {
    user_id: -1,
    first_name: '',
    last_name: '',
    email: '',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setUser: (value: UserType) => {},
};

export const UserContext = createContext(initialState);

// const UserProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(userReducer, initialState);
//   const addUserInfo = (user_id: number) => {
//     // const updatedUser = state.user = user;
//     fetchUserInfo(user_id);
//     // dispatch({
//     //   type: "ADD_USER_INFO",
//     //   payload: {
//     //     user: updatedUser
//     //   }
//     // });
//   }

//   const addToContacts = (user_id: number) => {
//     const updatedContactList = state.contacts.concat(user_id);
//     dispatch({
//       type: "ADD_TO_CONTACTS",
//       payload: {
//         contacts: updatedContactList
//       }
//     });
//   }

//   const removeFromContacts = (user_id: number) => {
//     const updatedContactList = state.contacts.filter((user) => user.user_id !== user_id);
//     dispatch({
//       type: "REMOVE_FROM_CONTACTS",
//       payload: {
//         contacts: updatedContactList
//       }
//     });
//   }

//   const fetchUserInfo = (user_id: number) => {
//     UserService.getUserInfo(user_id).then((result) => {
//       if(result.status) {
//         console.log("User Context fetch user info..", result.result);
//         // addUserInfo(result.result);
//       }
//     })
//   }

//   const value = {
//     user: state.user,
//     contacts: state.contacts,
//     blocked: state.blocked,
//     addUserInfo,
//     addToContacts,
//     removeFromContacts
//   }

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>

// }

// function useUser() {
//   const context = React.useContext(UserContext);
//   if(context === undefined) {
//     throw new Error('useUser must be in UserProvider');
//   }
//   return context;
// }

// export { UserProvider, useUser };
