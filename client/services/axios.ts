import axios from "axios";

let token: string = '';
if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = localStorage.getItem('accesstoken') as string;
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
        'Accept': "application/json"
    }
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;