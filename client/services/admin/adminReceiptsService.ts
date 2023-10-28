import axios from "../axios";

export const getAllReceipts = async () => {
    const result = (await axios.get('/admin/receipts')).data;
    return result;
}

export const updateStatusReceipt = async ({ BillStatusId, id}: any) => {
    try {
        console.log(BillStatusId, id);
        const result = (await axios.post(`/admin/receipts/status/${id}`, {BillStatusId: BillStatusId})).data;
        return result;
    } catch (error) {
        console.log(error);
    }
}