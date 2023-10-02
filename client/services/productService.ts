import axios from "./axios";

export const getAllProducts = async () => {
    const data = (await axios.get('/products')).data;
    return data;
}

export const getProductById = async (id: number) => {
    const data = (await axios.get(`/products/${id}`)).data;
    return data;
}