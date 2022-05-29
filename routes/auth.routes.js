const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt"); // хеширование паролей для базы данных (усложняем то что накалякал юзер)
const { check, validationResult } = require("express-validator"); // валидируем поля получаемые от клиента. имеет внутри "check" миллион метоов валидации для любых нужд
const router = Router();

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/register'
// важно так как роутер.пост либо базовый апп.пост это миделвеер то он может принимать НЕОГРАНИЧЕНОЕ количество миделвееров! тоесть и провалидировать маршрут и обработать функцию взаимодействия с базой данных и ++++ валидацию форм принять массивом как промежуточный миделвеер после роутинга на текущую страницу и перед работой с базой данных.
router.post(
    "/register",
    [
        check("name", "Error name validation").isLength({ min: 5 }),
        check("email", "Error email validation").isEmail(),
        check("password", "Error password validation").isLength({ min: 7 }),
    ],
    async (request, responce) => {
        try {
            const errOr = validationResult(request);
            if (!errOr.isEmpty) {
                return responce.status(400).json({ error: errOr, massage: "Error validation" });
            }
            const { name, email, password } = request.body; //реквест это то что отправляет нам клиен сторона
            const duplicateEmail = await User.findOne({ email });
            const duplicateName = await User.findOne({ name });
            if (duplicateEmail || duplicateName) {
                return responce.status(400).json({ massage: "error user, try anather data" });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const user = new User({ email: email, password: hashPassword });
            await user.save();
            responce.status(201).json({ massage: "User creted! My congraduletions" });
        } catch (error) {
            responce.status(500).json({ massage: "error router /register" }); //бэкендчик сам реализовывает объект ошибки!
        }
    }
); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/login'
router.post(
    "/login",
    [
        check("name", "Error name validation").isLength({ min: 5 }),
        check("password", "Error password validation").isLength({ min: 7 }),
    ],
    async (request, responce) => {
        try {
            const errOr = validationResult(request);
            if (!errOr.isEmpty) {
                return responce.status(400).json({ error: errOr, massage: "Error validation" });
            }
            const { name, password } = request.body; //реквест это то что отправляет нам клиен сторона
            const duplicateName = await User.findOne({ name });
            const duplicatePassword = await User.findOne({ password }); //тут нужно переписать в одну проверку с именем
            if (duplicatePassword && duplicateName) {
                console.log("ok, you login!");
            }
        } catch (error) {
            responce.status(500).json({ massage: "error router /login" });
        }
    }
); //функция выполняет логику запросов и ответов

module.exports = router; // это миделвеер для апи запроса
