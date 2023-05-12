import { PrivateValueStore } from "@react-navigation/native";
import AuthService from "../services/auth.services";

export async function AuthHeader(){

    const myHeaders = new Headers();

    const value = await AuthService.getToken();
    if (value) {
      console.log("THE TOKEN ISSSSS", value);
      myHeaders.append("X-Authorization", value);
    }

    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

export function RegularHeader() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}