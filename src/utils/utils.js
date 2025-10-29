import bcrypt from "bcryptjs";
import jwt, {} from "jsonwebtoken";
import nodemailer from "nodemailer";
import { error } from "console";
import { getUserForId } from "../db/db.repository.js";
//Константы
export const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
//Проверка на пользователя
export const isUser = (data) => {
    const user = data;
    return Boolean(user && typeof user === 'object' && user.id && user.email && user.password_hash && user.status && user.created_at && user.updated_at);
};
//Создание текущей даты
export const dateNow = new Date().toISOString();
//Создание истекающей даті
export const dateExpire = Date.now() + 30000;
//Хеширование пароля
export const hashedString = async (string) => {
    const hashedResult = await bcrypt.hash(string, 10);
    return hashedResult;
};
//Сравнение паролей
export const comparePass = async (password_hash, passwordInput) => {
    return await bcrypt.compare(password_hash, passwordInput);
};
// Создание токена
function createTokenUtils(data, secret) {
    const payload = {
        email: data.email,
        id: data.id,
        status: data.status
    };
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "10m"
    });
    return token;
}
const accsesSecret = "super_secret_key_accses";
const refreshSecret = "super_secret_key_refresh";
export const createToken = (data) => {
    const accsesToken = createTokenUtils(data, accsesSecret);
    const refreshToken = createTokenUtils(data, refreshSecret);
    const tokensArr = [accsesToken, refreshToken];
    return tokensArr;
};
// Првоерка токена
export const refreshToken = (refresh_token, data) => {
    try {
        jwt.verify(refresh_token, refreshSecret);
        const accsesToken = createTokenUtils(data, accsesSecret);
        return accsesToken;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
//проверка атентификации по токену
export const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'haven`t token' });
    }
    try {
        jwt.verify(token, accsesSecret);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Uncorrect token' });
    }
};
//Декодирование токена
export const decodedAccsesToken = (token) => {
    try {
        const decoded = jwt.verify(token, accsesSecret);
        return decoded;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export const decodedRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, refreshSecret);
        return decoded;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
//Отправка письма
export const sendlerEmailCode = (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "",
            pass: ""
        }
    });
    const mailOptions = {
        from: 'Authly',
        to: email,
        subject: "Confirm your email",
        text: code,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log("Send message:", info.response);
    });
};
//# sourceMappingURL=utils.js.map