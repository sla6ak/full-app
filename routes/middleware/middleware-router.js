//validation request
const { check, validationResult } = require("express-validator");
const validationSignup = (req, res, next) => {
    [
        check("name", "Error name validation").isLength({ min: 3 }),
        check("email", "Error email validation").isEmail(),
        check("password", "Error password validation").isLength({ min: 7 }),
    ];
    const errOr = validationResult(req);
    if (!errOr.isEmpty) {
        return res.status(400).json({ error: errOr, massage: "Error validation" });
    }
    next();
};
const validationLogin = (req, res, next) => {
    [
        check("email", "Error name validation").isEmail(),
        check("password", "Error password validation").exists().isLength({ min: 7 }),
    ];
    const errOr = validationResult(request);
    if (!errOr.isEmpty) {
        return response.status(400).json({ error: errOr, massage: "Error validation" });
    }
};

module.exports = { validationSignup, validationLogin };
