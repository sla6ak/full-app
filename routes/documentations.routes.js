const { Router } = require("express");
const router = Router();

// const path = require("path");
// const express = require("express");
// router.use(express.static("static")); // это обрабатывает линки из штмл для стилей и скриптов в папку статик

router.use(function (req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
// получить список всех доступных методов
router.get("/docs", (req, res) => {
    // res.sendFile(path.resolve("./static/index.html")); // почему то требует еще раз указать что нам нужно в папку статик для штмлки.
    console.log("просто верстка на стороне клиента будет и все можно вернуть json");
});

module.exports = router;
