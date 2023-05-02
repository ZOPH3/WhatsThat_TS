import IOController from "../controllers/io.controller";
import { logOutput, logType } from "../util/logger.util";
import * as DocumentPicker from "expo-document-picker";

class IOServices {
  public static async upload(
    user_id: number,
    file: DocumentPicker.DocumentResult
  ) {
    const data = await IOController.upload(user_id, file);
    // const type = data.status ? logType.success : logType.error;
    // logOutput(type, data.message);
    return data;
  }
}

export default IOServices;