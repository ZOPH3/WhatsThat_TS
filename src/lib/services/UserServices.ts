/* eslint-disable camelcase */
/* eslint-disable react-hooks/rules-of-hooks */
import { TLoginResponse, TSignUpResponse, TUser } from '../types/TSchema';

interface IUserServices {
  login: (email: string, password: string) => Promise<TLoginResponse | undefined>;
  logout: () => Promise<Response | undefined>;
  register: (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => Promise<TSignUpResponse | undefined>;
  getUserInfo: (user_id: number) => Promise<TUser | undefined>;
  updateUserInfo: (user_id: number, payload: Partial<TUser>) => Promise<Response | undefined>;
}
const UserServices = (apiCaller: any): IUserServices => {
  const login = async (email: string, password: string): Promise<TLoginResponse | undefined> => {
    const response = await apiCaller(
      { url: '/login', method: 'POST', data: { email, password } },
      false
    );
    return response.data as TLoginResponse;
  };

  const logout = async (): Promise<Response | undefined> => {
    const response = await apiCaller({ url: '/logout', method: 'POST' }, true);
    return response.data;
  };

  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<TSignUpResponse | undefined> => {
    const response = await apiCaller(
      { url: '/user', method: 'POST', data: { first_name, last_name, email, password } },
      false
    );
    return response.data as TSignUpResponse;
  };

  const getUserInfo = async (user_id: number): Promise<TUser | undefined> => {
    const response = await apiCaller({ url: `/user/${user_id}`, method: 'GET' }, true);
    return response.data as TUser;
  };

  const updateUserInfo = async (
    user_id: number,
    payload: Partial<TUser>
  ): Promise<Response | undefined> => {
    const response = await apiCaller(
      { url: `/user/${user_id}`, method: 'POST', data: payload },
      true
    );
    return response.data;
  };

  // TODO: Below API things
  // public static async getUserPhoto() {}
  // public static async uploadUserPhoto() {}
  // public static async searchForUser() {}

  return { login, logout, register, getUserInfo, updateUserInfo };
};

export default UserServices;
