import { MessageModel } from "../core/interfaces/MessageModel";

const messages: Array<MessageModel> = [{
  msg: "stringsssssssssssa",
  time: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
  id: 1,
  user: 1
},
{
  msg: "stringsssssssssssb",
  time: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
  id: 2,
  user: 1
},
{
  msg: "stringsssssssssssc",
  time: new Date(2018, 0O5, 0O5, 17, 23, 42, 11),
  id: 3,
  user: 1
}]

class MessageAPI implements IRequest<MessageModel>{

  GetAll(): MessageModel[] {
    return messages;
  }

  GetById(arg: number): MessageModel {
    return messages.find((message) => message.id === arg) ||
      { msg: "", time: new Date(2023), id: -1, user: -1 }
  }

  Remove(arg: number): boolean {
    let message: MessageModel = this.GetById(arg);

    if (message.id !== -1) {
      messages == messages.filter((message) => message.id !== arg);
      return true;
    }
    else {
      return false;
    }
  }

  Add(arg: MessageModel): boolean {
    messages.push(arg)
    return true;
  }

  Update(arg: MessageModel): boolean {
    throw new Error("Method not implemented.");
  }

}

export default MessageAPI;