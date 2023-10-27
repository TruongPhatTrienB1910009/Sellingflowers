import axios from "../axios"

export const getAllUsers = async () => {
    const result = (await axios.get("/admin/users")).data;
    return result;
}