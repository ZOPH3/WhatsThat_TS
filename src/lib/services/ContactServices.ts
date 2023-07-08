/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
import { TUser } from '../types/TSchema';
import log from '../util/LoggerUtil';

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

const ContactServices = (apiCaller: any): IContactServices => {
  const fetchContactList = async (): Promise<TUser[] | undefined> => {
    const response = await apiCaller({ url: '/contacts', method: 'GET' }, true);
    return response.data as TUser[];
  };

  const addContact = async (user_id: number): Promise<Response | undefined> => {
    const response = await apiCaller({ url: `/user/${user_id}/contact`, method: 'POST' }, true);
    return response.data as Response;
  };

  const deleteContact = async (user_id: number): Promise<Response | undefined> => {
    const response = await apiCaller({ url: `/user/${user_id}/contact`, method: 'DELETE' }, true);
    return response.data as Response;
  };

  const blockUser = async (user_id: number): Promise<Response | undefined> => {
    const response = await apiCaller({ url: `/user/${user_id}/block`, method: 'POST' }, true);
    if (!response) throw new Error('Unable to block user');
    if (response.status === 404) throw new Error('User not found');
    if (response.status === 401) throw new Error('Unable to block user');
    if (response.status === 400) throw new Error('You cannot block yourself');
    return response?.data || undefined;
  };

  const unblockUser = async (user_id: number) => {
    const response = await apiCaller({ url: `/user/${user_id}/block`, method: 'DELETE' }, true);
    if (!response) throw new Error('Unable to block user');
    if (response.status === 404) throw new Error('User not found');
    if (response.status === 401) throw new Error('Unable to unblock user');
    if (response.status === 400) throw new Error('You cannot unblock yourself');
    return response?.data || null;
  };

  const fetchBlockedList = async (): Promise<TUser[] | undefined> => {
    const response = await apiCaller({ url: '/blocked', method: 'GET' }, true);
    return response.data as TUser[];
  };

  const searchUsers = async (parameters: TSearchParams): Promise<TUser[] | undefined> => {
    let base = `/search?q=${parameters.q}`;
    const search_in = `&search_in=${parameters.search_in ? parameters.search_in : 'all'}`;
    base += search_in;
    if (parameters.limit) base += `&limit=${parameters.limit}`;
    if (parameters.offset) base += `&offset=${parameters.offset}`;

    const response = await apiCaller({ url: base, method: 'GET' }, true);
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
