import axios from "./axios";

export const getAllProducts = async () => {
    const data = (await axios.get('/products')).data;
    return data;
}

export const getProductById = async (id: number) => {
    const data = (await axios.get(`/products/${id}`)).data;
    return data;
}

export const sortProducts = async (data: any) => {
    const result = (await axios.post(`/products/search/sort`, data)).data;
    return result;
}

export const filterProducts = async (data: any) => {
    const result = (await axios.post(`/products/search/filter`, data)).data;
    return result;
}

export const getAllProductsByCategory = async (categoryid: any) => {
    const result = (await axios.get(`/products/categories/${categoryid}`)).data;
    return result;
}

export const getAllReviewByProductId = async (id: any) => {
    const result = (await axios.post(`/products/${id}`)).data;
    return result;
}