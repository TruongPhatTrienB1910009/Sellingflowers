import axios from "axios";

export const getCities = async () => {
    try {
        const response = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province", {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Token': process.env.NEXT_PUBLIC_ghn_token as string,
                'Accept': "application/json",
            }
        })
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDistricts = async (data: any) => {
    try {
        const res = (await axios({
            method: 'POST',
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
            data: data,
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Token': process.env.NEXT_PUBLIC_ghn_token as string,
                'Accept': "application/json",
            }
        })).data
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getWards = async (data: any) => {
    try {
        const res = (await axios({
            method: 'POST',
            url: `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
            data: data,
            headers: {
                'content-type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Token': process.env.NEXT_PUBLIC_ghn_token as string,
                'Accept': "application/json",
            }
        })).data
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const caculateDeliveryFee = async ({ address }: { address: any }) => {
    const { city, district, ward }: any = address;
    console.log(district.slice(0, district.indexOf("-")))

    const delivery = {
        "service_id": 53320,
        "service_type_id": null,
        "to_district_id": Number(district.slice(0, district.indexOf("-"))),
        "to_ward_code": ward.slice(0, ward.indexOf("-")) as string,
        "height": 50,
        "length": 20,
        "weight": 100,
        "width": 40,
        "insurance_value": null,
        "cod_failed_amount": null,
        "coupon": null
    }

    const response = (await axios({
        method: 'POST',
        url: "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        data: delivery,
        headers: {
            'content-type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Token': process.env.NEXT_PUBLIC_ghn_token as string,
            'Accept': "application/json",
        }
    })).data

    return response.data
}

export const getInfoShipment = async (id: any) => {
    const response = (await axios({
        method: 'GET',
        url: `https://sandbox.goship.io/api/v2/shipments/search?code=${id}`,
        data: null,
        headers: {
            'content-type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_go_ship_token,
            'Accept': "application/json",
        }
    })).data

    return response.data;
}