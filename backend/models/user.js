const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: [true, "This email is already in use."],
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "/public/user/default.jpg",
        },
        number: {
            type: String,
            required: true,
            unique: [true, "This number is already in use."],
        },
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
