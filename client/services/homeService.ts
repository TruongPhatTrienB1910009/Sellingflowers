import axios from "./axios";

export const handleSignUp = async (data: any) => {
    const account = (await axios.post('/signup', data)).data;
    return account;
}

export const handleSignIn = async (data: any) => {
    const account = (await axios.post('/signin', data)).data;
    return account;
}

export const handleAutoSignIn = async (accesstoken: string) => {
    const data = (await axios.post('/checkuser', accesstoken)).data;
    return data;
}