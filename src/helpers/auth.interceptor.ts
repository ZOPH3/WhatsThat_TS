import { useState } from 'react';
import { AsyncStorageKey } from '../util/as.keys';
import log from '../util/logger.util';
import { customAxios } from './axiosInstance';
import { loadKey } from '../wrappers/storage.methods';

async function getToken(){
    return await loadKey("user");
}

export function AuthInterceptor() {
    
    // customAxios.interceptors.request.use(
    //     async config => {
    //     log.info('Has gone through AUTH interceptor');
        
    //     config.headers['X-Authorization'] = await getToken().catch((e) => console.log(e));

    //     return config;
    //   },
    //   error => {
    //     return Promise.reject(error);
    //   })
    // customAxios.interceptors.response.use( response => {


    //     log.info('RESPONSE: ', response.config.url);

    //     return response;
    // })

}
