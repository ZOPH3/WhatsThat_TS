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
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    project_id: id
                }
            })
            return user;

        } catch (err) {

            return { project_id: -1 };
        }
    }

    static async newChat(input: { name: string }) {
        let data = JSON.stringify(input);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:3333/api/1.0.0/chat',
            headers: {
                'X-Authorization': '1b6c1bfaa74ed4b180ddd85659d7bba8',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static async all() {

        const token = '1b6c1bfaa74ed4b180ddd85659d7bba8';

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://10.0.2.2:3333/api/1.0.0/chat',
            headers: {
                'X-Authorization': token
            }
        };

        return axios.request(config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default ChatService;