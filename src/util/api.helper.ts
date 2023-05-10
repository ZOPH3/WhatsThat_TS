import AuthService from "../services/auth.services";

export async function AuthHeader(){
    const myHeaders = new Headers();
    const value = await AuthService.getToken();
    if (value.status) {
      myHeaders.append("X-Authorization", value.result);
    }
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

export function RegularHeader() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}