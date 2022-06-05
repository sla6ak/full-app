const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: [true, "User name required"] },
    number: { type: Number, required: [true, "User phone number required"], unique: true },
    user: { type: Types.ObjectId, ref: "User" }, // реф это ссылка на модель к которой мы ссылаемся
});

module.exports = model("Contact", schema);
