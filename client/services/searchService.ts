import axios from "./axios";

export const storeImage = async (data: any) => {
    const result = (await axios.post(`/search/store`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    return result;
}

export const deleteAllFiles = async () => {
    const result = (await axios.post(`/search/deleteall`)).data;
    return result;
}

export const deleteByPath = async (data: any) => {
    const result = (await axios.post(`/search/delete`, data)).data;
    return result;
}