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

export const caculateDeliveryFee = async ({ address }: { address: any }) => {
    console.log(address);
    const { city, district, ward }: any = address;
    console.log(city, district, ward);

    const delivery = {
        "shipment": {
            "address_from": {
                "district": "700100",
                "city": "700000",
                "ward": "8955"
            },
            "address_to": {
                "district": `${district.slice(0, district.indexOf("-"))}`,
                "city": `${city.slice(0, city.indexOf("-"))}`,
                "ward": `${ward.slice(0, ward.indexOf("-"))}`
            },
            "parcel": {
                "cod": null,
                "amount": 2000000,
                "width": 30,
                "height": 100,
                "length": 30,
                "weight": 150
            }
        }
    }

    const response = (await axios({
        method: 'POST',
        url: "https://sandbox.goship.io/api/v2/rates",
        data: delivery,
        headers: {
            'content-type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_go_ship_token,
            'Accept': "application/json",
        }
    })).data
    
    return response.data[0]
}