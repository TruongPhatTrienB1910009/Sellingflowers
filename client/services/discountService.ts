import axios from "./axios";

export const getExisDiscounts = async () => {
    const result = (await axios.get(`/discounts`)).data;
    return result;
}

export const getDiscountById = async (id: any) => {
    const result = (await axios.get(`/discounts/${id}`)).data;
    return result;
}