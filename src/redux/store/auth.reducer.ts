import { LOGIN, LOGOUT } from "./auth.constant"

const initialState = [{
    isAuthorised: false,
    tokenSet: false,
}]


// const setLoginStatus = (email: string, password: string) => {
//     return {
//         type: "LOGIN",
//         payload: {
//             email: email,
//             password: password
//         }
//     }
// }

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: 
            return [...state, action.payload]
        case LOGOUT: 
            return [...state, action.payload]
    }
}