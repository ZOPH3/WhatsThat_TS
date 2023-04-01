import { UserModel } from "../models/UserModel"

export default class User {

    first_name: string = ''
    last_name: string = ''
    user_id: number = -1
    email: string = ''
    password?: string
    session_token?: string

    constructor(){}

    setEmail(email : string){this.email = email}

    setPassword(password : string){this.password = password}

    setToken(token: string){
        this.session_token = token  
    }

    setUserId(id: number){
        this.user_id = id
    }

    setFirstName(first_name: string){ 
        this.first_name = first_name
    }
    setLastName(last_name: string){ 
        this.last_name = last_name
    }

    getToken(){
        return this.session_token
    }

    getUserInformation() : UserModel{
        return { 
            first_name: this.first_name,
            last_name: this.last_name,
            user_id: this.user_id,
            email: this.email,
            password: this.password,
            session_token: this.session_token
        }
    }

    addUser(email: string, password: string, first_name: string, last_name: string){
        this.email = email
        this.password = password
        this.first_name = first_name
        this.last_name = last_name
    }

}