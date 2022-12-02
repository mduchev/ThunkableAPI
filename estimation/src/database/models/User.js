const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: String,
        password: String,
        salt: String,
    }
);

module.exports = mongoose.model("user", UserSchema);