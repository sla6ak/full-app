const { Router } = require("express");
const router = Router();

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/register'
router.get("/register", async (request, responce) => {}); //функция выполняет логику запросов и ответов

// базовый путь перед роутом '/api/auth' далее перенаправляем '/api/auth/login'
router.get("/login", async (request, responce) => {}); //функция выполняет логику запросов и ответов

module.exports = router; // это миделвеер для апи запроса
