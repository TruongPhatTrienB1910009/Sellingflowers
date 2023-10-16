import axios from "./axios";

export const getAccount = async () => {
    const result = (await axios.get('/account/profile')).data;
    return result;
}

export const updateProfile = async (data: any) => {
    const result = (await axios.patch('/account/profile', data)).data;
    return result;
}   

export const createNewAddress = async (data: any) => {
    const result = (await axios.post('/account/address', data)).data;
    return result;
}