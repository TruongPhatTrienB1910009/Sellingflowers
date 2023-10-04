import axios from "./axios";

let token: string = '';
if (typeof window !== 'undefined') {
    // Perform localStorage action
    token = localStorage.getItem('accesstoken') as string;
}

const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    }
};

export const addItemToCart = async (data: any) => {
    const result = (await axios.post('/cart', data, config)).data;
    return result;
}