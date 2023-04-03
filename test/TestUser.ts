import { UserModel } from "../core/models/UserModel"

export const unauthorisedUserData : UserModel = {
    first_name: "",
    last_name: "",
    user_id: 0,
    email: "",
    password: ""
}

export const authorisedUserData : UserModel = {
    first_name: "Mario",
    last_name: "Liberator",
    user_id: 44,
    email: "AALover2023@gmail.com",
    session_token: "24324ADASDASD"
}

export const loginData = {
    "email": "ashley.williams@mmu.ac.uk",
    "password": "Wr3xh4m!"
  }

export const returnValueLogin = {
    "user_id": 14,
    "session_token": "b5d9e7be6c97aa855f721b6e742120f2"
  }

const addNewUser = {
    "first_name": "Ashley",
    "last_name": "Williams",
    "email": "ashley.williams@mmu.ac.uk",
    "password": "Wr3xh4m!"
  }

  