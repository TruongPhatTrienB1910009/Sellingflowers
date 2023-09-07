import axios from "./axios";

export const handleSignUp = async (data: any) => {
    const account = await axios.post('/signup', data);
    console.log("account", account);
    return account;
}

const handleLogin = async (data: any) => {

}