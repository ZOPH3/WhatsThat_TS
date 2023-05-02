import AuthService from "../services/auth.services";
import UrlBuilder from "../util/url.builder";
import * as DocumentPicker from "expo-document-picker";

export enum imageType {
  png = "image/png",
  jpeg = "image/jpeg",
}

class IOController {
  static async toBlob(uri: string){
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    
  }
  public static async upload(
    user_id: number,
    file: DocumentPicker.DocumentResult
  ) {
    const myHeaders = new Headers();
    

    const value = await AuthService.getToken();

    if (value != null) {
      myHeaders.append("X-Authorization", value.result);
    }

    const data = new FormData();

    if (file.type === "success" && file.output && file.mimeType) {
      
      data.append("", file.output[0], file.uri);
      myHeaders.append("Content-Type", file.mimeType);
    }

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    }

    fetch(UrlBuilder.uploadUserPhoto(user_id), requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  
}

export default IOController;
