import ContactController from "../controllers/contact.controller";
import { logType, logOutput } from "../util/logger.util";

class ContactServices {
  public static async fetchContacts() {
    const data = await ContactController.fetchContacts();
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
  public static async addContact(user_id: number) {
    const data = await ContactController.addContact(user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  public static async deleteContact(user_id: number) {
    const data = await ContactController.deleteContact(user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  public static async blockUser(user_id: number) {
    const data = await ContactController.blockUser(user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  public static async unblockUser(user_id: number) {
    const data = await ContactController.unblockUser(user_id);
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }

  public static async fetchblocked() {
    const data = await ContactController.fetchblocked();
    const type = data.status ? logType.success : logType.error;
    logOutput(type, data.message);
    return data;
  }
}

export default ContactServices;
