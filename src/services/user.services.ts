import UserController from "../controllers/user.controller";
import UserType from "../util/types/user.type";
import { logOutput, logType } from "../util/logger.util";

class UserService {
  public static async login(email: string, password: string) {
    const data = await UserController.login(email, password);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  public static async logout() {
    const data = await UserController.logout();
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
  public static async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const data = await UserController.register(
      first_name,
      last_name,
      email,
      password
    );
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
  public static async getUserInfo(user_id: number) {
    const data = await UserController.getUserInfo(user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
  public static async updateUserInfo(
    user_id: number,
    payload: Partial<UserType>
  ) {
    const data = await UserController.updateUserInfo(user_id, payload);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
}

export default UserService;
