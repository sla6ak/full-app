const { Router } = require("express");
const cors = require("cors");
const User = require("../models/User");
const config = require("config"); // просто сборник констант в виде объекта
const bcrypt = require("bcrypt"); // хеширование паролей для базы данных (усложняем то что накалякал юзер)
const { check, validationResult } = require("express-validator"); // валидируем поля получаемые от клиента. имеет внутри "check" миллион метоов валидации для любых нужд
const jwt = require("jsonwebtoken");
const router = Router();
const SECRET_KEY = config.get("jwtSecret");

// базовый путь перед роутом '/app-contacts/' далее перенаправляем '/app-contacts/users/register'
// важно так как роутер.пост либо базовый апп.пост это миделвеер то он может принимать НЕОГРАНИЧЕНОЕ количество миделвееров! тоесть и провалидировать маршрут и обработать функцию взаимодействия с базой данных и ++++ валидацию форм принять массивом как промежуточный миделвеер после роутинга на текущую страницу и перед работой с базой данных.
router.post(
    "/users/signup",
    [
        check("name", "Error name validation").isLength({ min: 5 }),
        check("email", "Error email validation").isEmail(),
        check("password", "Error password validation").isLength({ min: 7 }),
    ],
    async (request, response) => {
        try {
            const errOr = validationResult(request);
            if (!errOr.isEmpty) {
                return response.status(400).json({ error: errOr, massage: "Error validation" });
            }
            const { name, email, password } = request.body; //реквест это то что отправляет нам клиен сторона
            const duplicateEmail = await User.findOne({ email });
            const duplicateName = await User.findOne({ name });
            if (duplicateEmail || duplicateName) {
                return response.status(400).json({ massage: "error user, try anather data" });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashPassword });
            await user.save();
            response.status(200).json({ massage: "User creted! My congraduletions" });
        } catch (error) {
            response.status(500).json({ massage: "error router /users/signup" }); //бэкендчик сам реализовывает объект ошибки!
        }
    }
); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/app-contacts/' далее перенаправляем '/app-contacts/login'
router.post(
    "/users/login",
    [
        check("name", "Error name validation").exists().isLength({ min: 5 }),
        check("password", "Error password validation").exists().isLength({ min: 7 }),
    ],
    async (request, response) => {
        try {
            const errOr = validationResult(request);
            if (!errOr.isEmpty) {
                return response.status(400).json({ error: errOr, massage: "Error validation" });
            }
            const { name, password } = request.body; //реквест это то что отправляет нам клиен сторона
            const user = await User.findOne({ name }); // тут мы вытащили конкретного юзера если нашли его
            if (!user) {
                return response.status(400).json({ massage: "User do not find" });
            }
            const isPassword = await bcrypt.compare(password, user.password); // метод который сравнивает захешированый пароль с прилетевшим от юзера
            if (!isPassword) {
                return response.status(400).json({ massage: "Password is unvalidate" }); //нельзя сообщать такое но только как учебный пример сделаем
            }
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" }); // функция принимает три параметра в 1й можно запихать объект с разными данными юзера name, id... 2й это любая строка для закодирования и 3й это время существования токена (рекомендуемое 1 час)
            response.status(200).json({ token: token, userID: user.id, massage: `Welcome ${user.name}!` });
        } catch (error) {
            response.status(500).json({ massage: "error router /users/login" });
        }
    }
); //функция выполняет логику запросов и ответов

// и наконец проверка токена на валидность
// базовый путь перед роутом '/app-contacts/' далее перенаправляем '/app-contacts/users/current'
router.post("/users/current", [], async (request, response) => {
    try {
        const { token } = request.headers; //реквест это то что отправляет нам клиен сторона
        const user = await User.findOne({ token }); // тут мы вытащили конкретного юзера если нашли его
        if (!user) {
            return response.status(400).json({ massage: "Error token" });
        }
        response.status(200).json({
            token: token,
            userID: user.id,
            name: user.name,
            emeil: user.emeil,
            massage: `Welcome ${user.name}!`,
        });
    } catch (error) {
        response.status(500).json({ massage: "error router /users/current" });
    }
});

// тестовый сервер
// router.post("/users/login", (request, response) => {
//     try {
//         console.log(request.body);
//         // const { bodyReq } = request.body; //реквест это то что отправляет нам клиен сторона
//         response.send("POST request to the homepage");
//         if (bodyReq) {
//             return response.status(407).json({ massage: `Welcome!` });
//         }
//         // response.status(205).json({});
//     } catch (error) {
//         response.status(505).json({ massage: "error router /users/current" });
//     }
// });

// router.post("/users/login", async (req, res) => {
//     res.status(298).json({ massege: "hello" });
// });

module.exports = router; // это миделвеер для апи запроса
