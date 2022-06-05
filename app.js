const express = require("express");
const cors = require("cors");
const config = require("config"); // просто сборник констант в виде объекта
const mongoose = require("mongoose");
const routerAuth = require("./routes/auth.routes"); // в роуте расписаны запросы и пути к их выполнению на сервере
const routerContacts = require("./routes/contacts.routes");
const routerDocs = require("./routes/documentations.routes");
const bodyParser = require("body-parser");
const PORT = config.get("port") || 5000;
const BASE_URL = config.get("mongoURL");
const app = express();
// app.use(express.static(path.join("static")));

app.use(bodyParser.urlencoded({ extended: false })); //несовсем понимаю что это за миделвеер, но в доках он указан. без него работает
app.use(bodyParser.json());
// app.use(express.json({extended:true})); //такой же миделвеер для обработки json с клиента
app.use(cors());

//добавим новые роутеры для различных запросов
app.use("/api-contacts/users", routerAuth);
app.use("/api-contacts/contacts", routerContacts);
app.use("/api-contacts/docs/", routerDocs);

async function start() {
    try {
        mongoose.connect(BASE_URL).then(() => {
            console.log("mongoDB conecting!");
        });
        app.listen(PORT, () => {
            console.log(`started port ${PORT}!`);
        });
    } catch (error) {
        console.log(`server error with code ${error}, try later please`);
        process.exit(0); //завершим процесс допустим с кодом ноль
    }
}

start();
