import { Platform } from "react-native";
import AuthService from "../services/auth.services";
import UrlBuilder from "../util/url.builder";

export enum imageType {
  png = "image/png",
  jpeg = "image/jpeg",
}

class IoController {
  static checkImageType() {}
  public static async upload(
    user_id: number,
    file: { name: any; type: any; uri: string }
  ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const data = new FormData();
    data.append("file", {
      name: file.name,
      type: file.type,
      uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    return fetch(UrlBuilder.uploadUserPhoto(user_id), requestOptions)
      .then((response) => {
        return {
          status: true,
          message: `Successfully uploaded photo.`,
          result: response,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: `Unable to upload file...`,
          result: "",
          error: error,
        };
      });
  }
}
