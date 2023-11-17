const nodemailer = require("nodemailer");
import * as dotenv from "dotenv";
const JWT = require('jsonwebtoken');
dotenv.config();

export const sendEmailToReset = async (email: string) => {
    let key = process.env.jwt;
    const token = JWT.sign({email: email}, key, {expiresIn: 60 * 10});
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.emailuser,
            pass: process.env.emailpassword
        }
    });

    const info = await transporter.sendMail({
        from: '"Green." <phattrientruong15062001@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "LẤY LẠI MẬT KHẨU GREEN.", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Vui lòng nhấn <a href="http://localhost:3001/resetpassword?token=${token}">vào đây</a> để đổi lại mật khẩu đăng nhập.</p>`, // html body
    });

    return {
        info: info,
        token: token,
    };
}