import axios from "./adminAxios";

export const getAllReceipts = async () => {
    const result = (await axios.get('/admin/receipts')).data;
    return result;
}

export const confirmReceipt = async ({id}: any) => {
    try {
        const result = (await axios.post(`/admin/receipts/status/${id}`)).data;
        return result;
    } catch (error) {
        console.log(error);
    }
}