const { Router } = require("express");
const User = require("../models/User");
const config = require("config"); // просто сборник констант в виде объекта
const bcrypt = require("bcrypt"); // хеширование паролей для базы данных (усложняем то что накалякал юзер)
const { validationSignup, validationLogin } = require("./middleware/validation.middleware"); // валидируем поля получаемые от клиента. имеет внутри "check" миллион метоов валидации для любых нужд
const jwt = require("jsonwebtoken");
const router = Router();
const SECRET_KEY = config.get("jwtSecret");
const errMassage = require("./error/error.masage");
const authCurent = require("./middleware/auth.middleware");

// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/register'
router.post("/signup", validationSignup, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const duplicateEmail = await User.findOne({ email });
        const duplicateName = await User.findOne({ name });
        if (duplicateEmail || duplicateName) {
            return errMassage(res, 400);
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ name: name, email: email, password: hashPassword, contacts: [] });
        await user.save();
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "9h" }); // функция принимает три параметра в 1й можно запихать объект с разными данными юзера name, id... 2й это любая строка для закодирования и 3й это время существования токена (рекомендуемое 1 час)
        res.status(200).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                massage: `User creted! My congraduletions! Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
}); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/login'
router.post("/login", validationLogin, async (req, res) => {
    try {
        const { email, password } = req.body; //реквест это то что отправляет нам клиен сторона
        const user = await User.findOne({ email }); // тут мы вытащили конкретного юзера если нашли его
        if (!user) {
            return errMassage(res, 404);
        }
        const isPassword = await bcrypt.compare(password, user.password); // метод который сравнивает захешированый пароль с прилетевшим от юзера
        if (!isPassword) {
            errMassage(res, 400);
            return;
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "9h" }); // функция принимает три параметра в 1й можно запихать объект с разными данными юзера name, id... 2й это любая строка для закодирования и 3й это время существования токена (рекомендуемое 1 час)
        res.status(200).json({
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                massage: `Welcome ${user.name}!`,
            },
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
}); //функция выполняет логику запросов и ответов

// и наконец проверка токена на валидность
// базовый путь перед роутом '/api-contacts/' далее перенаправляем '/api-contacts/users/current'
router.get("/current", authCurent, async (req, res) => {
    try {
        const user = await User.findOne({ id: req.id }); // тут мы вытащили конкретного юзера если нашли его
        if (!user) {
            errMassage(res, 401);
            return;
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            massage: `Welcome ${user.name}!`,
        });
    } catch (error) {
        errMassage(res, 504, error);
        return;
    }
});

module.exports = router; // это миделвеер для апи запроса
