// import AuthService from '../../services/auth.services';

import { StorageKeys } from "../../types/TStorageKeys";
import ASHelper from "../AsyncStorageHelper";
import log from "../LoggerUtil";

export async function AuthHeader() {
  const myHeaders = new Headers();

  const item = await ASHelper.getItem(StorageKeys.AuthToken);
  if (item) {
    log.debug("TOKEN FOUND: " + item);
    myHeaders.append('X-Authorization', item.value);
  }

  myHeaders.append('Content-Type', 'application/json');
  return myHeaders;
}

export function RegularHeader() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  return myHeaders;
}

export async function AuthHeaderTest() {
  let token;
  const item = await ASHelper.getItem(StorageKeys.AuthToken);
  if (item) {
    token = item.value as string;
  }
  
  const config = {
    headers:{
      'X-Authorization': token,
      'Content-Type': 'application/json'
    }
  };

  return config;
}