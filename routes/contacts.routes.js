const { Router } = require("express");
const Contact = require("../models/Contact");
const router = Router();
const errorMassage = require("./error/error.masage");
const authCurent = require("./middleware/auth.middleware");

// Получим список всех контаков
router.get("/", authCurent, async (req, res) => {
    try {
        const listCotacts = await Contact.find({ user: req.id });
        res.status(200).json(listCotacts);
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Добавим новый контакт в список
router.post("/", authCurent, async (req, res) => {
    try {
        const { name, number } = req.body;
        const contact = new Contact({
            name: name,
            number: number,
            user: req.id, // получим ссылку на юзера из токена
        });
        await contact.save(function (err) {
            if (err) {
                return errorMassage(res, 504, err);
            }
        });
        return res.status(200).json(contact);
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Удалим контакт по ID
router.delete("/:id", authCurent, async (req, res) => {
    try {
        const contact = await Contact.findOne({ id: req.params.id });
        await Contact.deleteOne({ id: req.params.id }); //, function (err) {if (err) return errorMassage(res, 504, err);}
        return res.status(200).json(contact);
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

// Изменим существующий контакт
router.patch("/:id", authCurent, async (req, res) => {
    try {
    } catch (error) {
        return errorMassage(res, 504, error);
    }
});

module.exports = router;
