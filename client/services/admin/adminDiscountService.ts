import axios from "./adminAxios"

export const createNewDiscount = async (data: any) => {
    const result = (await axios.post("/admin/discounts/", data)).data;
    return result;
}