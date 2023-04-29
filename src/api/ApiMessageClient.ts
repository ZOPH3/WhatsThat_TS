// import axios, { AxiosRequestConfig } from 'axios';

// class ApiMessageClient {
//     private baseUrl: string;
//     private auth: string;

//     constructor(baseUrl: string, auth: string) {
//         this.baseUrl = baseUrl;
//         this.auth = auth;
//     }

//     async getChatList() {
//         const config: AxiosRequestConfig = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: `${this.baseUrl}/chat`,
//             headers: {
//                 'X-Authorization': `${this.auth}`,
//                 'Content-Type': 'application/json'
//             },
//         };

//         try {
//             const response = await axios.request(config);
//             return response.data;
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }

//     createNewChat() { }

//     async getChatInformation(chat_id: number, limit: number, offset: number) {

//         const config: AxiosRequestConfig = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: `${this.baseUrl}/chat/${chat_id}`,
//             headers: {
//                 'X-Authorization': `${this.auth}`,
//                 'Content-Type': 'application/json'
//             },
//         };

//         try {
//             const response = await axios.request(config);
//             return response;
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }

//     updateChatInformation(chat_id: number) { }

//     addUserToChat() { }
//     removeUserFromChat() { }

//     async sendMessage(chat_id: number, message: string) {
//         const data = JSON.stringify({
//             "message": message
//         });

//         const config: AxiosRequestConfig = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: `${this.baseUrl}/chat/${chat_id}/message`,
//             headers: {
//                 'X-Authorization': `${this.auth}`,
//                 'Content-Type': 'application/json'
//             },
//             data: data
//         };

//         try {
//             const response = await axios.request(config);
//             return response;
//         } catch (error) {
//             console.log(error);
//             throw error;
//         }
//     }
//     updateMessage() { }
//     deleteMessage() { }

//     public setAuth(auth : string) {this.auth = auth}

// }

// export default ApiMessageClient;
