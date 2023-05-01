import { createContext } from "react";

const initialState = {
    isLoggedIn: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsLoggedIn: (value: boolean) => {}
}

export const AuthContext = createContext(initialState);
