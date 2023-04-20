import axios, { AxiosInstance } from "axios";
import MessageServices from "../services/message.services";
import { loadKey } from "../wrappers/storage.methods";
import AsyncStorage from "@react-native-async-storage/async-storage";

// async function testGetMessages(chat_id: number, token: string) {
//     return MessageServices.getMessages(chat_id, token);
// }

// export async function getToken(){
//     return await loadKey(Key);
// }

// // TODO: THIS SEEMS TO WORK FOR VALIDATING TOKENS
// async function executeApi(chat_id: number) {
//   const token = await getToken().catch((e) => console.log(e));
//   return testGetMessages(chat_id, token.token);
// }

/**
 * API helper,
 * needs to set auth key, if it hasnt already. 
 * If theres not auth key, means invalid
 * If 401 return, means invalid
 * Both goes to /logout
 * 
 * Base request config
 * add authentication
 * 
 * execute
 * read response
 * if success then return?
 */

// class APIHelper {

//     static async execute(method: string, url : string, data?: object, headers? : object){
        
//         const token = await getToken().catch((e) => console.log(e));
  
//         headers = {
//             "X-Authorization": token
//         }

//         return axios({method, url, headers})
//     }

// }

// export default APIHelper;




    //THIS IS THE SERVICE?
    // async function testGetMessages(chat_id: number, token: string) {
    //     return MessageServices.getMessages(chat_id, token);
    // }
    
    // async function getToken(){
    //     const token = await loadKey("user");
    //     console.log("TOKEN", token)
    //     return token;
    // }
    
    // // THIS WOULD BE THE CONTROLLER?
    // async function testthis(chat_id: number) {
    //   const token = await getToken().catch((e) => console.log(e));
    //   return testGetMessages(chat_id, token.token);
    // }