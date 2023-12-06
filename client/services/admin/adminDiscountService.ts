import axios from "./adminAxios"

export const createNewDiscount = async (data: any) => {
    const result = (await axios.post("/admin/discounts/", data)).data;
    return result;
}

export const getAllDiscounts = async () => {
    const result = (await axios.get("/admin/discounts/")).data;
    return result;
}