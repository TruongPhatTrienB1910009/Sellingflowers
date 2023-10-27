import axios from "./axios";

export const getReceiptbyId = async (id: any) => {
    const result = (await axios.get(`/bill/${id}`)).data;
    return result;
}