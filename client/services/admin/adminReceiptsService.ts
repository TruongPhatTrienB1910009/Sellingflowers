import axios from "../axios";

export const getAllReceipts = async () => {
    const result = (await axios.get('/admin/receipts')).data;
    return result;
}