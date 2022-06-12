const errorMassage = require("../error/error.masage");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN" это строка поэтому распарсим ее в массив на 2 слова - и вытянем елемент 1
        if (!token) {
            return errorMassage(res, 401);
        }
        const tokenDecoder = jwt.verify(token, SECRET_KEY); // что шифровали то и вытянем ({ id: user.id })
        req.id = tokenDecoder.id;
        next();
    } catch (error) {
        return errorMassage(res, 401);
    }
};
