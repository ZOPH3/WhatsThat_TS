import { TUser } from '../types/TSchema';
import { TLoginResponse, TSignUpResponse } from '../types/TSchema';
import { useApiContext } from '../context/ApiContext';

interface IUserController {
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
const UserController = (): IUserController => {
  const { useApi } = useApiContext();
  if (!useApi) {
    throw new Error('Unable to find Auth API...');
  }

  const login = async (email: string, password: string): Promise<TLoginResponse | undefined> => {
    const response = await useApi(
      { url: '/login', method: 'POST', data: { email, password } },
      false
    );
    console.log(response);
    return response.data as TLoginResponse;
  };

  const logout = async (): Promise<Response | undefined> => {
    const response = await useApi({ url: '/logout', method: 'POST' }, true);
    return response.data as Response;
  };

  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<TSignUpResponse | undefined> => {
    const response = await useApi(
      { url: '/user', method: 'POST', data: { first_name, last_name, email, password } },
      false
    );
    return response.data as TSignUpResponse;
  };

  const getUserInfo = async (user_id: number): Promise<TUser | undefined> => {
    const response = await useApi({ url: `/user/${user_id}`, method: 'GET' }, true);
    return response.data as TUser;
  };

  const updateUserInfo = async (
    user_id: number,
    payload: Partial<TUser>
  ): Promise<Response | undefined> => {
    const response = await useApi({ url: `/user/${user_id}`, method: 'POST', data: payload }, true);
    return response.data as Response;
  };

  // TODO: Below API things
  // public static async getUserPhoto() {}
  // public static async uploadUserPhoto() {}
  // public static async searchForUser() {}

  return { login, logout, register, getUserInfo, updateUserInfo };
};

export default UserController;
