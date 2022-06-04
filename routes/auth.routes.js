const { Router } = require("express");
const User = require("../models/User");
const config = require("config"); // просто сборник констант в виде объекта
const bcrypt = require("bcrypt"); // хеширование паролей для базы данных (усложняем то что накалякал юзер)
const { validationSignup, validationLogin } = require("./middleware/middleware-router"); // валидируем поля получаемые от клиента. имеет внутри "check" миллион метоов валидации для любых нужд
const jwt = require("jsonwebtoken");
const router = Router();
const SECRET_KEY = config.get("jwtSecret");
const { errorMassage } = require("./error/errormassage");

// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/register'
router.post("/users/signup", validationSignup, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const duplicateEmail = await User.findOne({ email });
        const duplicateName = await User.findOne({ name });
        if (duplicateEmail || duplicateName) {
            return errorMassage(res, 400);
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ name: name, email: email, password: hashPassword, contacts: [] });
        await user.save();
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" }); // функция принимает три параметра в 1й можно запихать объект с разными данными юзера name, id... 2й это любая строка для закодирования и 3й это время существования токена (рекомендуемое 1 час)
        res.status(200).json({
            token: token,
            user: {
                userID: user.id,
                name: user.name,
                email: user.email,
                massage: `User creted! My congraduletions! Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        return errorMassage(res, 504, error);
    }
}); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/login'
router.post("/users/login", validationLogin, async (req, res) => {
    try {
        const { email, password } = req.body; //реквест это то что отправляет нам клиен сторона
        const user = await User.findOne({ email }); // тут мы вытащили конкретного юзера если нашли его
        if (!user) {
            return errorMassage(res, 404);
        }
        const isPassword = await bcrypt.compare(password, user.password); // метод который сравнивает захешированый пароль с прилетевшим от юзера
        if (!isPassword) {
            return errorMassage(res, 400);
        }
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" }); // функция принимает три параметра в 1й можно запихать объект с разными данными юзера name, id... 2й это любая строка для закодирования и 3й это время существования токена (рекомендуемое 1 час)
        res.status(200).json({
            token: token,
            user: {
                userID: user.id,
                name: user.name,
                email: user.email,
                massage: `Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        return errorMassage(res, 504, error);
    }
}); //функция выполняет логику запросов и ответов

// и наконец проверка токена на валидность
// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/current'
router.get("/users/current", async (req, res) => {
    try {
        const { token } = req.headers; //реквест это то что отправляет нам клиен сторона
        const user = await User.findOne({ token }); // тут мы вытащили конкретного юзера если нашли его
        if (!user) {
            return errorMassage(res, 401);
        }
        res.status(200).json({
            token: token,
            user: {
                userID: user.id,
                name: user.name,
                email: user.email,
                massage: `Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

module.exports = router; // это миделвеер для апи запроса
