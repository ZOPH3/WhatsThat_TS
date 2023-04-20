import axios from "axios";

export const customAxios = axios.create({
    baseURL: "http://10.0.2.2:3333/api/1.0.0"
});


// CUSTOM_AXIOS.interceptors.request.use(
//     config => {
//         config.headers['X-Authorization'] = `1b6c1bfaa74ed4b180ddd85659d7bba8`;
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
// )

// const requestHandler = request => {
//     // Token will be dynamic so we can use any app-specific way to always   
//     // fetch the new token before making the call
//     request.headers['X-Authorization'] = `1b6c1bfaa74ed4b180ddd85659d7bba8`; 
  
//     return request;
// };

// const responseHandler = response => {
//     if (response.status === 401) {
//        console.log("Redirect user, unauth")
//     }

//     return response;
// };

// const errorHandler = error => {
//     return Promise.reject(error);
// };

// // Step-3: Configure/make use of request & response interceptors from Axios
// // Note: You can create one method say configureInterceptors, add below in that,
// // export and call it in an init function of the application/page.
// customAxios.interceptors.request.use(
//     (request) => requestHandler(request),
//     (error) => errorHandler(error)
// );

// customAxios.interceptors.response.use(
//     (response) => responseHandler(response),
//     (error) => errorHandler(error)
//  );
