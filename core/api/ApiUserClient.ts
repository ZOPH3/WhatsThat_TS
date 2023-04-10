import axios, { AxiosRequestConfig } from 'axios';
import User from '../classes/User';

//TODO: Get URL from global variable? so it can be easily changed

// interface UserModel {
//     id: number;
//     email: string;
//     password?: string;
//     first_name: string;
//     last_name: string;
// }

class ApiUserClient {
    private baseUrl: string;
    private auth: string;

    constructor(baseUrl: string, auth: string) {
        this.baseUrl = baseUrl;
        this.auth = auth;
    }

    public async addUser(email: string, password: string, first_name: string, last_name: string) {

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/user`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ email, password, first_name, last_name })
        };

        try {
            const response = await axios.request(config);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getUserById(user_id: number) {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.baseUrl}/user/${user_id}`,
            headers: {
                'X-Authorization': this.auth,
            },
        };

        try {
            const response = await axios.request(config);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async updateUser(user: User) {

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/user/${user.user_id}`,
            headers: {
                'X-Authorization': this.auth,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(user),
        };

        try {
            await axios.request(config);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async login(email: string, password: string) {

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ email, password }),
        };

        try {
            const response = await axios.request(config)
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async logout() {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/logout`,
            headers: {
                'X-Authorization': this.auth,
            },
        };

        try {
            const response = await axios.request(config)
            this.setAuth('')
            return response
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async getUserProfilePhoto(userId: number): Promise<Buffer> {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.baseUrl}/user/${userId}/photo`,
            headers: {
                'X-Authorization': this.auth,
            },
            responseType: 'arraybuffer',
        };

        try {
            const response = await axios.request<Buffer>(config);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async uploadUserProfilePhoto(userId: number, file: Buffer, contentType: string): Promise<void> {

        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${this.baseUrl}/user/${userId}/photo`,
            headers: {
                'X-Authorization': this.auth,
                'Content-Type': contentType,
            },
            data: file,
        };

        try {
            await axios.request(config);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public searchUsers(q: string, searchIn: string, limit: number, offset: number) {
        const params = {
            q,
            searchIn,
            limit,
            offset,
        };

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${this.baseUrl}/user/search`,
            headers: {
                'X-Authorization': this.auth,
            },
            params,
        };

        return axios.request(config);
    }

    //TODO: Change to variable from device
    public setAuth(auth : string) {this.auth = auth}
}

export default ApiUserClient;
