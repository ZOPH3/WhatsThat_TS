import MessageType from "./message.type";
import UserType from "./user.type";

type ChatInfoType = {
    "chat_id": number,
    "name": string,
    "creator": UserType,
    "last_message": MessageType
}

export default ChatInfoType;