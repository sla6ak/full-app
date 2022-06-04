const { Router } = require("express");
const Contact = require("../models/Contact");
const router = Router();
const { errorMassage } = require("./error/errormassage");

// Получим список всех контаков
router.get("/contacts", async (req, res) => {
    try {
        const listCotacts = await Contact.find({ user: null });
        res.status(200).json(listCotacts);
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Добавим новый контакт в список
router.post("/contacts", async (req, res) => {
    try {
        const { name, phone } = req.body;
        const contact = new Contact({
            name: name,
            phone: phone,
            user: "", // получим ссылку на юзера из токена
        });
        await contact.save();
        return res.status(200).json(contact);
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Удалим контакт по ID
router.delete("/contacts/:id", async (req, res) => {
    try {
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Изменим существующий контакт
router.patch("/contacts/:id", async (req, res) => {
    try {
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

module.exports = router;
