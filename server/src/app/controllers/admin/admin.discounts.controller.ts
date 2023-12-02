import { NextFunction, Request, Response } from "express";
const db = require('../../models');

interface adminRequest extends Request {
    user: any
}

function generateRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const createDiscount = async (req: adminRequest, res: Response, next: NextFunction) => {
    try {
        let randomString = '';
        let check = true;

        do {
            const rd = generateRandomString(5)
            const getRandom = await db.Discount.findOne({
                where: {
                    code: rd
                }
            })

            if(!getRandom) {
                randomString = rd;
                break;
            }
        } while (check);

        const newDiscount = await db.Discount.create({
            code: randomString,
            ...req.body
        })
        await newDiscount.save();

        const currentDate = new Date();
        console.log(currentDate.getFullYear())

        return res.status(200).json({
            EC: 0,
            EM: 'OK',
            DT: {
                newDiscount,
                "today": currentDate
            }
        })
    } catch (error) {
        return res.status(500).json({
            EC: -1,
            EM: 'NOT OK',
            DT: (error as Error).message
        })
    }
}

module.exports = {
    createDiscount
}