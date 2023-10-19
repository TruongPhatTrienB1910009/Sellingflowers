import axios from "axios";

export const getCities = async () => {
    try {
        const response = await fetch("https://sandbox.goship.io/api/v2/cities", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_go_ship_token,
                'Accept': "application/json",
            }
        })
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDistricts = async (city: any) => {
    try {
        const res = (await axios({
            method: 'GET',
            url: `https://sandbox.goship.io/api/v2/cities/${city}/districts`,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_go_ship_token,
                'Accept': "application/json",
            }
        })).data
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWards = async (district: any) => {
    try {
        const res = (await axios({
            method: 'GET',
            url: `https://sandbox.goship.io/api/v2/districts/${district}/wards`,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_go_ship_token,
                'Accept': "application/json",
            }
        })).data
        return res.data;
    } catch (error) {
        console.log(error);
    }
}