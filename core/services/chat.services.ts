/**
 * 
 * Deals with fetching from DB (In this case from API)
 * 
 */

import axios from "axios";

class ChatService {

    static async delete(data: any) {

        let user = undefined;

        try {
            user = await prisma.user.delete({
                where: {
                    project_id: data.project_id
                }
            })

        } catch (e) {
            // data = { project_id: -1 }
        }
        return user;
    }

    static async update(data: any) {
        let user = undefined;
        try {
            user = await prisma.user.update({
                where: {
                    project_id: data.project_id
                },
                data
            })

        } catch (e) {
            // data = { project_id: -1 }
        }
        return user;
    }

    static async getById(id: number) {
        try {
            let user = await prisma.user.findFirstOrThrow({
                where: {
                    project_id: id
                }
            })
            return user;

        } catch (err) {

            return { project_id: -1 };
        }
    }

    static async add(data: any) {
        let user = undefined;
        try {
            user = await prisma.user.create({
                data
            })

        } catch (e) {
            // data = { project_id: -1 }
        }
        return user;
    }

    static async all(token: string) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:3333/api/1.0.0/chat',
            headers: {
                'X-Authorization': token
            }
        };

        const result = axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));

                return response.data;
            })
            .catch((error) => {
                // console.log(error);
                return [];
            });

            return result
    }
}

export default ChatService;