export interface UserModel {
    first_name: string
    last_name: string
    user_id: number
    email: string
    password?: string
    session_token?: boolean
}

// TODO: Remove this eventually