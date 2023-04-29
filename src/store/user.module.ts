import UserType from "../types/user.type";
import log from "../util/logger.util";

class UserStore {
  private user: UserType;

  constructor() {
    console.log("x");
  }
  load() {
    console.log("Check is user is in local storage...");
  }
}
