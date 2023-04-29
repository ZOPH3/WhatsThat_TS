import { TokenStoreWrapper } from "../redux/store/token.store";
import { logOutput, logType } from "../util/logger.util";

class AuthService {
    //FIXME: Seems like spegetti
    public static async getToken() {
        const data = await TokenStoreWrapper.getInstance().getToken();
        const type = data.status ? logType.success : logType.error;
        logOutput(type, data.message);
        return data;
    }

    public static async setToken(token: string){
        const data = await TokenStoreWrapper.getInstance().setToken(token);
        const type = data.status ? logType.success : logType.error;
        logOutput(type, data.message);
        return data;
    }
}

export default AuthService;