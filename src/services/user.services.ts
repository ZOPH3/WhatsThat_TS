/**
 * 
 * Deals with fetching from DB (In this case from API)
 * 
 */

import UserController from "../controllers/user.controller";
import { logOutput, logType } from "../util/logger.util";

//FIXME: all is wrong
// class UserService {

//     // private token;
//     // static async getToken() {
//     //     const token = await AsyncStorageHelper.getData(AsyncStorageKey.Authenticated_User)

//     //     return token;
//     // }

//     static async delete(data: any) {

//         let user = undefined;

//         try {
//             user = await prisma.user.delete({
//                 where: {
//                     project_id: data.project_id
//                 }
//             })

//         } catch (e) {
//             // data = { project_id: -1 }
//         }
//         return user;
//     }

//     static async update(data: any) {
//         let user = undefined;
//         try {
//             user = await prisma.user.update({
//                 where: {
//                     project_id: data.project_id
//                 },
//                 data
//             })

//         } catch (e) {
//             // data = { project_id: -1 }
//         }
//         return user;
//     }

//     static async getById(id: number) {
//         try {
//             const user = await prisma.user.findFirstOrThrow({
//                 where: {
//                     project_id: id
//                 }
//             })
//             return user;

//         } catch (err) {

//             return { project_id: -1 };
//         }
//     }

//     static async add(data: any) {
//         let user = undefined;
//         try {
//             user = await prisma.user.create({
//                 data
//             })

//         } catch (e) {
//             // data = { project_id: -1 }
//         }
//         return user;
//     }

//     static async all(token: string) {
//         const output = await fetch(`url/api/`, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'X-Authorization': `${token}`
//             },
//         }).then((response) => response.json())
//             .then((data: {}) => {
//                 return data;
//             })

//         console.log("Fetched all users", output);

//         return output
//     }
// }

class UserService {
    public static async login(email: string, password: string) {
        // let message = "Requesting login...";
        // let type = logType.success;
        // let status = false;

        const data = await UserController.login(email, password);
        const type = data.status? logType.success : logType.error;
        logOutput(type, data.message);
        // const result = await data.json();

        // if(data.status > 200) {
        //     type = logType.error;
        //     message += "Failed to login.";
        // }else {
        //     status = true;
        //     message += "Credentials valid.";
        // }

        // logOutput(type, message);

        // return {
        //     status: status,
        //     message: message,
        //     result: result
        //   };

        return data;
    }
}

export default UserService;