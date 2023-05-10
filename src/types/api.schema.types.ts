export type ChatSummary = {
    chat_id: number,
    name: string,
    creator: User,
    last_message: SingleMessage
}

export type ChatSummaries = {
    chatSummaries: ChatSummary[]
}

export type User = {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string
}

export type Users = {
    users: User[]
}

export type AddUser = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export type UpdateUser = {
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
}

export type LoginUser = {
    email: string, 
    password: string
}

export type LoginResponse = {
    user_id: number, 
    session_token: string
}

export type SignUpResponse = {
    user_id: number
}

export type CreateChat = {
    name: string
}

export type CreateChatResponse = {
    chat_id: number
}

export type Chat = {
    name: string,
    creator: User,
    members: Users,
    messages: Messages
}

export type UpdateChat = {
    name: string
}

export type SingleMessage = {
    message_id: string,
    timestamp: number,
    message: string,
    author: User
}

export type Messages = {
    messages: SingleMessage[]
}


export type SendMessage = {
    message: string
}