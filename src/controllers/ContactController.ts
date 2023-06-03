import { useApiContext } from '../context/ApiContext';
import { TUser } from '../types/TSchema';
import log from '../util/LoggerUtil';

interface IContactsController {
  fetchContactList: () => Promise<TUser[] | undefined>;
  addContact: (user_id: number) => Promise<Response | undefined>;
  deleteContact: (user_id: number) => Promise<Response | undefined>;
  blockUser: (user_id: number) => Promise<Response | undefined>;
  unblockUser: (user_id: number) => Promise<Response | undefined>;
  fetchBlockedList: () => Promise<TUser[] | undefined>;
  searchUsers: (params: SearchParams) => Promise<TUser[] | undefined>;
}

interface SearchParams {
  q: string;
  search_in?: 'all' | 'contacts';
  limit?: number;
  offset?: number;
}

// https://github.com/ZJav1310/WhatsThat_TS/issues/1
const ContactsController = (): IContactsController => {
  const apiProvider = useApiContext();
  const { authApi } = apiProvider;

  if (!apiProvider || !authApi) {
    throw new Error('Unable to find Auth API...');
  }

  const fetchContactList = async (): Promise<TUser[] | undefined> => {
    try {
      const response = await authApi.get(`/contacts`);
      return response.data as TUser[];
    } catch (err) {
      log.error(err);
    }
  };

  const addContact = async (user_id: number): Promise<Response | undefined> => {
    try {
      const response = await authApi.get(`/user/${user_id}/contact`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const deleteContact = async (user_id: number): Promise<Response | undefined> => {
    try {
      const response = await authApi.delete(`/user/${user_id}/contact`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const blockUser = async (user_id: number) => {
    try {
      const response = await authApi.get(`/user/${user_id}/block`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const unblockUser = async (user_id: number): Promise<Response | undefined> => {
    try {
      const response = await authApi.get(`/user/${user_id}/block`);
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const fetchBlockedList = async (): Promise<TUser[] | undefined> => {
    try {
      const response = await authApi.get('/blocked');
      return response.data as TUser[];
    } catch (err) {
      log.error(err);
    }
  };

  const searchUsers = async (parameters: SearchParams): Promise<TUser[] | undefined> => {
    let base = `/search?q=${parameters.q}`;
    const search_in = `&search_in=${parameters.search_in ? parameters.search_in : 'all'}`;
    base += search_in;
    if (parameters.limit) base += '&limit=' + parameters.limit;
    if (parameters.offset) base += '&offset=' + parameters.offset;

    try {
      const response = await authApi.get(base);
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
    } catch (err) {
      log.error(err);
    }
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

export default ContactsController;
