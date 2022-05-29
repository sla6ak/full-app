const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const router = require("./routes/auth.routes"); // в роуте расписаны запросы и пути к их выполнению на сервере

const PORT = config.get("port") || 5000;
const BASE_URL = config.get("mongoURL");
const app = express(); //это наш будущий сервер в переменной создался там лежит масса методов колбеков
app.use("/api/auth", router); //1й аргумент базовый путь, 2м наше приложение использует роутер в качестве миделвеера

//добавим новые роутеры для различных пользователей
// console.log(app);

(async () => {
    try {
        await mongoose.connect(BASE_URL, {});
        app.listen(PORT, () => {
            console.log(`started port ${PORT}!`);
        });
    } catch (error) {
        console.log("server error vik");
        process.exit(0); //завершим процесс допустим с кодом ноль
    }
})();
