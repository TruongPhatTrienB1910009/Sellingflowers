import axios from "axios";

export const createShipment = async (data: any) => {
    try {
        const token = process.env.token;
        const ShopId = process.env.shopid;
        const response = (await axios({
            method: 'POST',
            url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
            data: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Token': token,
                'ShopId': ShopId,
            }
        })).data

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getStatusShipment = async (data: any) => {
    try {
        const token = process.env.token;
        const response = (await axios({
            method: 'GET',
            url: `http://sandbox.goship.io/api/v2/shipments/search?code=${data}`,
            data: null,
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token,
                'Accept': "application/json",
            }
        })).data

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getInfoShipment = async (data: any) => {
    console.log(data);
    const token = process.env.token;
    const ShopId = process.env.shopid;
    const response = (await axios({
        method: 'GET',
        url: `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail`,
        data: data,
        headers: {
            'content-type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Token': token,
            'ShopId': ShopId,
        }
    })).data
    
    return response.data;
}