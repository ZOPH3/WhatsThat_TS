import { TUser } from '../types/TSchema';

interface IContactServices {
  fetchContactList: () => Promise<TUser[] | undefined>;
  addContact: (user_id: number) => Promise<Response | undefined>;
  deleteContact: (user_id: number) => Promise<Response | undefined>;
  blockUser: (user_id: number) => Promise<Response | undefined>;
  unblockUser: (user_id: number) => Promise<Response | undefined>;
  fetchBlockedList: () => Promise<TUser[] | undefined>;
  searchUsers: (params: TSearchParams) => Promise<TUser[] | undefined>;
}

export type TSearchParams = {
  q: string;
  search_in?: 'all' | 'contacts';
  limit?: number;
  offset?: number;
};

const ContactServices = (useFetch: any): IContactServices => {
  const fetchContactList = async (): Promise<TUser[] | undefined> => {
    const response = await useFetch({ url: '/contacts', method: 'GET' }, true);
    return response.data as TUser[];
  };

  const addContact = async (user_id: number): Promise<Response | undefined> => {
    const response = await useFetch({ url: `/user/${user_id}/contact`, method: 'GET' }, true);
    return response.data as Response;
  };

  const deleteContact = async (user_id: number): Promise<Response | undefined> => {
    const response = await useFetch({ url: `/user/${user_id}/contact`, method: 'DELETE' }, true);
    return response.data as Response;
  };

  const blockUser = async (user_id: number) => {
    const response = await useFetch({ url: `/user/${user_id}/block`, method: 'GET' }, true);
    return response.data as Response;
  };

  const unblockUser = async (user_id: number): Promise<Response | undefined> => {
    const response = await useFetch({ url: `/user/${user_id}/block`, method: 'DELETE' }, true);
    return response.data as Response;
  };

  const fetchBlockedList = async (): Promise<TUser[] | undefined> => {
    const response = await useFetch({ url: '/blocked', method: 'GET' }, true);
    return response.data as TUser[];
  };

  const searchUsers = async (parameters: TSearchParams): Promise<TUser[] | undefined> => {
    let base = `/search?q=${parameters.q}`;
    const search_in = `&search_in=${parameters.search_in ? parameters.search_in : 'all'}`;
    base += search_in;
    if (parameters.limit) base += '&limit=' + parameters.limit;
    if (parameters.offset) base += '&offset=' + parameters.offset;

    const response = await useFetch({ url: base, method: 'GET' }, true);
    const userList: { user_id: any; first_name: any; last_name: any; email: any }[] = [];
    response.data.forEach(
      (user: {
        user_id: any;
        first_name: any;
        given_name: any;
        last_name: any;
        family_name: any;
        email: any;
      }) => {
        userList.push({
          user_id: user.user_id,
          first_name: user.first_name ?? user.given_name,
          last_name: user.last_name ?? user.family_name,
          email: user.email,
        });
      }
    );
    return userList as TUser[];
  };

  return {
    fetchContactList,
    addContact,
    deleteContact,
    blockUser,
    unblockUser,
    fetchBlockedList,
    searchUsers,
  };
};

export default ContactServices;
