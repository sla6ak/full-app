const express = require("express");
const config = require("config"); // просто сборник констант в виде объекта
const mongoose = require("mongoose");
const router = require("./routes/auth.routes"); // в роуте расписаны запросы и пути к их выполнению на сервере

const PORT = config.get("port") || 5000;
const BASE_URL = config.get("mongoURL");
const app = express(); //это наш будущий сервер в переменной создался там лежит масса методов колбеков
// console.log(app);

//добавим новые роутеры для различных запросов
app.use("/app-contacts/", router); //1й аргумент базовый путь, 2м наше приложение использует роутер в качестве миделвеера

(async () => {
    try {
        await mongoose.connect(BASE_URL, {});
        app.listen(PORT, () => {
            console.log(`started port ${PORT}!`);
        });
    } catch (error) {
        console.log(`server error with code ${error}, try later please`);
        process.exit(0); //завершим процесс допустим с кодом ноль
    }
})();
