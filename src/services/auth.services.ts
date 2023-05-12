import AuthController from '../controllers/auth.controller';

class AuthService {
  public static async getToken() {
    const data = await AuthController.getToken();
    
    if(!data) {
      throw new Error(`Unable to get token...`);
    }

    return data;
  }

  public static async setToken(token: string) {
    const data = await AuthController.setToken(token);
    
    if(!data) {
      throw new Error(`Unable to set token...`);
    }

    return data;
  }
}

export default AuthService;
