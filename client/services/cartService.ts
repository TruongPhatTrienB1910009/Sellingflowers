import axios from "./axios";

export const addItemToCart = async (data: any) => {
    const result = (await axios.post('/cart', data)).data;
    return result;
}

export const getAllItemsInCart = async () => {
    const result = (await axios.get('/cart')).data;
    return result;
}

export const updateTotalsItem = async (data: any) => {
    const result = (await axios.patch('/cart', data)).data;
    return result;
}