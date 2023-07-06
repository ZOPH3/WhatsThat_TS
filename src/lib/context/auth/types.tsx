import { Dispatch, SetStateAction } from 'react';
import { TUser } from '../../types/TSchema';

export interface IAuthState {
  id: number | undefined;
  current_user: TUser | undefined;
  token: string | undefined;
  authenticated: boolean | undefined;
}

export interface IAuthContext {
  authState: IAuthState;
  setAuthState: Dispatch<SetStateAction<IAuthState>>;
  setToken?: (token: string) => void;
  setUserId?: (id: number) => void;
  getToken?: () => string | undefined;
  setAuth?: (auth: boolean) => void;
  logout?: () => void;
  setCachedAuthState?: (authState: IAuthState) => void;
  getCachedAuthState?: () => Promise<any>;
}
