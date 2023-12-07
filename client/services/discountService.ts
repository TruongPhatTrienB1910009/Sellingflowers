import axios from "./axios";

export const getExisDiscounts = async () => {
    const result = (await axios.get(`/discounts`)).data;
    return result;
}