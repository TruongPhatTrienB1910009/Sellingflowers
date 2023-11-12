import axios from "axios";

export const uploadDataToPinecone = async (data: any) => {
    try {
        const res = (await axios({
            method: 'POST',
            url: `http://localhost:3001/api/embedding`,
            data: data,
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Accept': "application/json",
            }
        })).data
        return res;
    } catch (error) {
        console.log(error);
    }
}