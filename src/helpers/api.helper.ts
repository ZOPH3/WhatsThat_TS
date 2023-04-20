import MessageServices from "../services/message.services";
import { loadKey } from "../wrappers/storage.methods";

async function testGetMessages(chat_id: number, token: string) {
    return MessageServices.getMessages(chat_id, token);
}

async function getToken(){
    return await loadKey("user");
}

// TODO: THIS SEEMS TO WORK FOR VALIDATING TOKENS
async function getProcessedData(chat_id: number) {
  const token = await getToken().catch((e) => console.log(e));
  return testGetMessages(chat_id, token.token);
}

