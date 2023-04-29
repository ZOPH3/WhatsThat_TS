import { logOutput, logType } from "../../util/logger.util";
import { StorageKeys } from "../../util/as.keys";
import AuthController from "../../controllers/auth.controller";

export abstract class TokenStoreWrapper  {
  private static tokenStore : TokenStore;

  public static getInstance() : TokenStore {
      if(TokenStore === undefined){
          this.tokenStore = new TokenStore();
      } 

      return this.tokenStore as TokenStore;
  }
}

class TokenStore {
  private isAuthorised = false;
  private isTokenSet = false;
  private key = StorageKeys.AuthToken;
  private dateAuthorised = null;

  constructor() {
    logOutput(logType.info, "New auth store created...");
  }
 
  
  public isUserAuthorised(){
    return this.isAuthorised && this.isTokenSet;
  }

  /**
   * Clear existing keys?
   * Set key to value given,
   * Check if the key has been set,
   * If it has, set is authorised to true,
   * set the date to when authorised
   * @param value
   */

  public async setToken(value: string) {
    let message = "Setting token... ";
    let type = logType.info;

    const result = await AuthController.setToken(value);

    if (result && result.status) {
      this.setDateAuthorised();
      this.isTokenSet = true;
      message += result.message;
      message += `Token date created set to ${this.dateAuthorised}... `;
    } else {
      type = logType.error;
      this.isTokenSet = false;
      this.isAuthorised = false;      
      message += result.message;
      message += "Setting token failed... ";
    }

    logOutput(type, message);
    
    return {
      status: result.status,
      message: message,
      result: result.status,
    };
  }

  public async getToken(){
    const result = await AuthController.getToken();
    return result;
  }

  private setDateAuthorised() {
    return Date.now();
  }

  private async load() {
    let message = "Checking if token is set... ";
    const result = await AuthController.getToken();
    let type = logType.success;

    message += result.message;

    if (result && result.status) {
      this.isAuthorised = true;
      message += `${this.key} has been validated. `;
    } else {
      type = logType.error;
      message += "Unable to authorise user...";
      this.isTokenSet = false;
      this.isAuthorised = false;
    }

    logOutput(type, message);

    return {
      status: result.status,
      message: message,
      result: result.result,
    };
  }

  public async reset(){
    const result = await AuthController.resetToken();
    if(result.status){
      this.isAuthorised = false;
      this.isTokenSet = false;
      this.dateAuthorised = null;
    }
    return result;
  }
}