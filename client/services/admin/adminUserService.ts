import axios from "./adminAxios"

export const getAllUsers = async () => {
    const result = (await axios.get("/admin/users")).data;
    return result;
}

export const adminGetUserById = async (id: number) => {
    const result = (await axios.get(`/admin/users/${id}`)).data;
    return result;
}