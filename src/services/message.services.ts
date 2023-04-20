/**
 * 
 * Deals with fetching from DB (In this case from API)
 * 
 */

import axios from "axios";

class MessageServices {
    
    static getMessages(id: number) {

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://10.0.2.2:3333/api/1.0.0/chat/${id}`,
            headers: {
                'X-Authorization': '1b6c1bfaa74ed4b180ddd85659d7bba8'
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

export default MessageServices;