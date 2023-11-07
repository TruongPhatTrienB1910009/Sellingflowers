import axios from "../axios";

export const costStatistics = async () => {
    const result = (await axios.get("/admin/dashboard/statistical")).data;
    return result;
}