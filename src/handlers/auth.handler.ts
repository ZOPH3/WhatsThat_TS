import AuthService from '../services/auth.services';
import UserService from '../services/user.services';

export async function loginHandler(email: string, password: string) {
  // try {
    const loginResult = await UserService.login(email, password);

    if (!loginResult) {
      throw new Error(`Unable to login user`);
    }

    await AuthService.setToken(loginResult.token);

    const fetchedUser = await UserService.getUserInfo(loginResult.id);

    if (!fetchedUser) {
      throw new Error(`Unable to find user`);
    }

    return fetchedUser;
  // } catch (error) {
  //   console.log('[Login Handler] ', error);
  // }
}
