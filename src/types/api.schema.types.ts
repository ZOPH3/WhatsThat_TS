export type ChatSummary = {
    chat_id: number,
    name: string,
    creator: User,
    last_message: SingleMessage
}

type ChatSummaries = {
    chatSummaries: ChatSummary[]
}

type User = {
    user_id: number,
    first_name: string,
    last_name: string,
    email: string
}

type Users = {
    users: User[]
}

type AddUser = {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

type UpdateUser = {
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
}

type LoginUser = {
    email: string, 
    password: string
}

type LoginResponse = {
    user_id: number, 
    session_token: string
}

type SignUpResponse = {
    user_id: number
}

type CreateChat = {
    name: string
}

type CreateChatResponse = {
    chat_id: number
}

type Chat = {
    name: string,
    creator: User,
    members: Users,
    messages: Messages
}

type UpdateChat = {
    name: string
}

type SingleMessage = {
    message_id: string,
    timestamp: number,
    message: string,
    author: User
}

type Messages = {
    messages: SingleMessage[]
}


type SendMessage = {
    message: string
}