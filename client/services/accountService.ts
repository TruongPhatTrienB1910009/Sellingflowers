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

export const getAllAddress = async () => {
    const result = (await axios.get('/account/address')).data;
    return result;
}

export const getAddressById = async (id: any) => {
    const result = (await axios.get(`/account/address/${id}`)).data;
    return result;
}

export const updateAddress = async (id: any, data: any) => {
    const result = (await axios.patch(`/account/address/${id}`, data)).data;
    return result;
}

export const deleteAddress = async (id: any) => {
    const result = (await axios.delete(`/account/address/${id}`)).data;
    return result;
}

export const getAllBillByType = async (type: any) => {
    try {
        const result = (await axios.get(`/account/receipts/${type}`)).data;
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const reviewProduct = async (data: any) => {
    const result = (await axios.post(`/account/product/review`, data)).data;
    return result;
}