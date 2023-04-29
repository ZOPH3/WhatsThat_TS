/**
 * This deals with the list of chats?
 * Chat list has a date it was fetched,
 * Each chat has a date of when it was updated, 
 * 
 * 
 * When user sends a message, save to local and then push to db?
 */

import MessageType from "../types/message.type";
import UserType from "../types/user.type";
import { IStore } from "./store.interface";

type ChatList = {
  chat_list: ChatDetails[];
  last_updated: Date;
  id: number; // This is set by the system when a new fetch is made?
};

type ChatDetails = {
  chat_id: number;
  name: string;
  creator: UserType;
  last_message: MessageType;
  last_updated: Date;
};

type ChatExpanded = {
  name: string;
  creator: UserType;
  members: UserType[];
  messages: Message[];
  last_updated: Date;
};

type Message = {
  message_id: number;
  timestamp: number;
  message: string;
  author: UserType;
  isDraft?: boolean; // TODO: Draft handler
};

class ChatStore {
  private conversationList = [];

  public async fetchChatList(){
    /**
     * check if connection is valid?
     * if so, fetch message list
     */
  }
}
