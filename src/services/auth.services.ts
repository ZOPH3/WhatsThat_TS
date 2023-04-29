import AuthController from "../controllers/auth.controller";
import { logOutput, logType } from "../util/logger.util";

class AuthService {
    //FIXME: Seems like spegetti
    public static async getToken() {
        // const data = await TokenStoreWrapper.getInstance().getToken();
        const data = await AuthController.getToken();
        const type = data.status ? logType.success : logType.error;
        logOutput(type, data.message);
        return data;
    }

    public static async setToken(token: string){
        const data = await AuthController.setToken(token);
        const type = data.status ? logType.success : logType.error;
        logOutput(type, data.message);
        return data;
    }
}

export default AuthService;