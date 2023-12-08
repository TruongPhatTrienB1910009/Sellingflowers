import axios from "./adminAxios";

export const costStatistics = async () => {
    const result = (await axios.get("/admin/dashboard/statistical")).data;
    return result;
}

export const getAllBillToday = async () => {
    const result = (await axios.get("/admin/dashboard/today")).data;
    return result;
}