const { Schema, model } = require("mongoose");
const schema = new Schema({
    name: { type: String, required: [true, "User name required"] },
    phone: { type: Number, required: [true, "User phone number required"], unique: true },
});
module.exports = model("Contacts", schema);
