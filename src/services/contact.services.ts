import ContactController from "../controllers/contact.controller";

class ContactServices {
  public static async fetchContacts() {
    const response = await ContactController.fetchContacts() ?? undefined;
    return response;
  }
  public static async addContact(user_id: number) {
    const response = await ContactController.addContact(user_id) ?? undefined;
    return response;
  }

  public static async deleteContact(user_id: number) {
    const response = await ContactController.deleteContact(user_id) ?? undefined;
    return response;
  }

  public static async blockUser(user_id: number) {
    const response = await ContactController.blockUser(user_id) ?? undefined;
    return response;
  }

  public static async unblockUser(user_id: number) {
    const response = await ContactController.unblockUser(user_id) ?? undefined;
    return response;
  }

  public static async fetchblocked() {
    const response = await ContactController.fetchblocked() ?? undefined;
    return response;
  }
}

export default ContactServices;
