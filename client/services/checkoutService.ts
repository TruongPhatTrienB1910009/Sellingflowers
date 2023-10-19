import axios from "./axios";

export const checkOut = async (data: any) => {
    try {
        const result = (await axios.post('/checkout', data)).data;
        return result;
    } catch (error) {
        console.log(error);
    }
}