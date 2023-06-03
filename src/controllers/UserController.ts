import { TUser } from '../types/TSchema';
import { TLoginResponse, TSignUpResponse } from '../types/TSchema';
import { useApiContext } from '../context/ApiContext';
import log from '../util/LoggerUtil';

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
  const apiProvider = useApiContext();
  const { authApi, publicApi } = apiProvider;

  if (!apiProvider || !authApi || !publicApi) {
    throw new Error('Unable to find Auth API...');
  }

  const login = async (email: string, password: string): Promise<TLoginResponse | undefined> => {
    try {
      const response = await publicApi.post('/login', {
        data: { email: email, password: password },
      });
      return response.data as TLoginResponse;
    } catch (err) {
      log.error(err);
    }
  };

  const logout = async (): Promise<Response | undefined> => {
    try {
      const response = await authApi.post('/logout');
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  const register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<TSignUpResponse | undefined> => {
    try {
      const response = await publicApi.post('/user', {
        data: {
          first_name: first_name,
          llast_name: last_name,
          email: email,
          password: password,
        },
      });
      return response.data as TSignUpResponse;
    } catch (err) {
      log.error(err);
    }
  };

  const getUserInfo = async (user_id: number): Promise<TUser | undefined> => {
    try {
      const response = await authApi.post(`/user/${user_id}`);
      return response.data as TUser;
    } catch (err) {
      log.error(err);
    }
  };

  const updateUserInfo = async (
    user_id: number,
    payload: Partial<TUser>
  ): Promise<Response | undefined> => {
    try {
      const response = await authApi.post(`/user/${user_id}`, { data: payload });
      return response.data as Response;
    } catch (err) {
      log.error(err);
    }
  };

  // TODO: Below API things
  // public static async getUserPhoto() {}
  // public static async uploadUserPhoto() {}
  // public static async searchForUser() {}

  return { login, logout, register, getUserInfo, updateUserInfo };
};

export default UserController;
