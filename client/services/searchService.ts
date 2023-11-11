import axios from "./axios";

export const storeImage = async (data: any) => {
    const result = (await axios.post(`/search/store`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    return result;
}