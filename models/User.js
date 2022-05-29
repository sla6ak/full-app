import { Schema, model, Types } from "mongoose"; //типы это часть библиотеки мангуста для описания колекции
const Contact = require("./Contact");

const schema = new Schema({
    name: { type: String, required: true, unique: true }, // тут же можно передавать функции валидации из доков мангуста пример внизу
    email: { unique: true, required: true, type: String },
    password: { type: String, required: true },
    contacts: [{ type: Types.ObjectId, ref: Contact }], // реф это ссылка на модель к которой мы ссылаемся
});

module.exports = model("User", schema);

// validate: {
//       validator: function(v) {
//         return /\d{3}-\d{3}-\d{4}/.test(v);
//       },
//       message: props => `${props.value} is not a valid phone number!`
//     }
