import UserController from '../controllers/user.controller';
import AuthService from '../services/auth.services';

export async function loginHandler(email: string, password: string) {
  const loginResult = await UserController.login(email, password);

  if (!loginResult) {
    throw new Error(`Unable to login user`);
  }

  await AuthService.setToken(loginResult.token);

  const fetchedUser = await UserController.getUserInfo(loginResult.id);

  if (!fetchedUser) {
    throw new Error(`Unable to find user`);
  }

  return fetchedUser;
}
