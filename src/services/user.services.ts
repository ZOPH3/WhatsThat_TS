import UserController from "../controllers/user.controller";
import UserType from "../util/types/user.type";

class UserService {
  public static async login(email: string, password: string) {
    const response = await UserController.login(email, password) ?? undefined;
    return response;
  }

  public static async logout() {
    const response = await UserController.logout() ?? undefined;
    return response;
  }

  public static async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const response = await UserController.register(first_name, last_name, email, password) ?? undefined;
    return response;
  }

  public static async getUserInfo(user_id: number) {
    const response = await UserController.getUserInfo(user_id) ?? undefined;
    return response;
  }

  public static async updateUserInfo(
    user_id: number,
    payload: Partial<UserType>
  ) {
    const response = await UserController.updateUserInfo(user_id, payload) ?? undefined;
    return response;
  }
}

export default UserService;
