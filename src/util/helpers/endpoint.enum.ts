export enum endpoint {
    createNewUser = "/user",
    getUserInformation = "/user/{user_id}",
    updateUserInformation = "/user/{user_id}",
    login = "/login",
    logout = "/logout",
    getUserPhoto = "/user/{user_id}/photo",
    updateUserPhoto = "/user/{user_id}/photo",
    search = "/search",

    viewContacts = "/contacts",
    addContact = "/user/{user_id}/contact",
    deleteContact = "/user/{user_id}/contact",
    viewBlocked = "/blocked",
    blockUser = "/user/{user_id}/block",
    unblockUser = "/user/{user_id}/block",

    viewChats = "/chat",
    startNewConversation = "/chat",
    getChatDetails = "/chat/{chat_id}", /** This is rused to get the chat messages also */
    updateChatDetails = "/chat/{chat_id}",

    addUserToConversation = "/chat/{chat_id}/user/{user_id}",
    removeUserFromConversation = "/chat/{chat_id}/user/{user_id}",

    sendMessage = "/chat/{chat_id}/message",
    updateMessage = "/chat/{chat_id}/message/{message_id}",
    deleteMessage = "/chat/{chat_id}/message/{message_id}"
}