import React, { createContext, useState } from "react";
import UserType from "../util/types/user.type";

const initialState = {
  user: {
    user_id: -1,
    first_name: "",
    last_name: "",
    email: "",
  },
  contacts: [],
  blocked: [],

};

export const UserContext = createContext(initialState);
