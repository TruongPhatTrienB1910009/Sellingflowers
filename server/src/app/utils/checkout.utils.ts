import axios from "axios";

export const createShipment = async (data: any) => {
    try {
        const token = process.env.token;
        const response = (await axios({
            method: 'POST',
            url: "https://sandbox.goship.io/api/v2/shipments",
            data: JSON.stringify(data),
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

export const getStatusShipment = async (data: any) => {
    try {
        const token = process.env.token;
        console.log(JSON.stringify(data));
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