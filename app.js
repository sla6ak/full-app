const express = require("express");
const cors = require("cors");
const config = require("config"); // просто сборник констант в виде объекта
const mongoose = require("mongoose");
const router = require("./routes/auth.routes"); // в роуте расписаны запросы и пути к их выполнению на сервере
const bodyParser = require("body-parser");
const PORT = config.get("port") || 5000;
const BASE_URL = config.get("mongoURL");
const app = express(); //это наш будущий сервер в переменной создался там лежит масса методов колбеков
// console.log(app);
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); //несовсем понимаю что это за миделвеер, но в доках он указан. без него работает

//добавим новые роутеры для различных запросов
app.use("/app-contacts/", bodyParser.json(), cors(), router); //1й аргумент базовый путь, 2м наше приложение использует роутер в качестве миделвеера

async function start() {
    try {
        mongoose.connect(BASE_URL);
        app.listen(PORT, () => {
            console.log(`started port ${PORT}!`);
        });
    } catch (error) {
        console.log(`server error with code ${error}, try later please`);
        process.exit(0); //завершим процесс допустим с кодом ноль
    }
}

start();
