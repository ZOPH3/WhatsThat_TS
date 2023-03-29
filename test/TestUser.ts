import { UserModel } from "../core/models/UserModel"

export const unauthorisedUserData : UserModel = {
    firstname: "",
    lastname: "",
    id: 0,
    email: "",
    password: ""
}

export const authorisedUserData : UserModel = {
    firstname: "Mario",
    lastname: "Liberator",
    id: 44,
    email: "AALover2023@gmail.com",
    token: "24324ADASDASD"
}