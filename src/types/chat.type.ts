import MessageType from "./message.type";
import UserType from "./user.type";

type SingleChatType = {
    "name": string,
    "creator": UserType,
    "members": UserType[],
    "messages"?: MessageType[]
}

export default SingleChatType;