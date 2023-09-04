import bcrypt from 'bcrypt';
const dotenv = require('dotenv');
dotenv.config();
const JWT = require('jsonwebtoken');
const db = require('../models');

const getRolesAccount = async (account: any) => {
    try {
        const data = await db.Group_account.findOne({
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            },
            where: { id: account.GroupAccountId }
        })

        if (data) {
            return data;
        } else {
            return {};
        }
    } catch (error) {
        throw(error)
    }
}


const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        return hasedPassword;
    } catch (error) {
        throw(error);
    }
}

const checkPassword = async (password: string, hasedPassword: string) => {
    try {
        const result = await bcrypt.compare(password, hasedPassword);
        return result;
    } catch (error) {
        throw(error);
    }
}

const createToken = (payload: any) => {
    let key = process.env.jwt;
    let token = null;
    try {
        token = JWT.sign(payload, key, {expiresIn: "3h"})
    } catch (error) {
        throw(error);
    }
    return token;
}

const verifyToken = (token: string) => {
    let data = null;
    let key = process.env.jwt;
    try {
        data = JWT.verify(token, key);
    } catch (error) {
        throw(error);
    }
    return data;
}

module.exports = {
    getRolesAccount, hashPassword, checkPassword, createToken, verifyToken
}