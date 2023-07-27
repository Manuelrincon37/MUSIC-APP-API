//Import method and Schema from mongoose
const { Schema, model } = require("mongoose")
const { setTheUsername } = require("whatwg-url")
//Create new user model
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        default: "role_user",
        select: false
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
//Export model
module.exports = model("User", UserSchema, "users")