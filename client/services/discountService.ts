import axios from "./axios";

export const resetPassword = async (data: any) => {
    const result = (await axios.post(`/resetpassword`, data)).data;
    return result;
}