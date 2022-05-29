const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = Router();

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/register'
router.post("/register", async (request, responce) => {
    try {
        const { name, email, password } = request.body; //реквест это то что отправляет нам клиен сторона
        const duplicateEmail = await User.findOne({ email });
        const duplicateName = await User.findOne({ name });
        if (duplicateEmail || duplicateName) {
            return responce.status(400).JSON({ massage: "error user, try anather data" });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashPassword });
    } catch (error) {
        responce.status(500).JSON({ massage: "error router /register" }); //бэкендчик сам реализовывает объект ошибки!
    }
}); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/login'
router.post("/login", async (request, responce) => {
    try {
        const { name, password } = request.body; //реквест это то что отправляет нам клиен сторона
        const duplicateName = await User.findOne({ name });
        const duplicatePassword = await User.findOne({ password }); //тут нужно переписать в одну проверку с именем
        if (duplicatePassword && duplicateName) {
            console.log("ok, you login!");
        }
    } catch (error) {
        responce.status(500).JSON({ massage: "error router /login" });
    }
}); //функция выполняет логику запросов и ответов

module.exports = router; // это миделвеер для апи запроса
