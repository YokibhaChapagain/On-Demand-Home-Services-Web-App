const mongoose = require("mongoose");

// Tasker Schema
const taskerSchema = new mongoose.Schema(
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
        description: {
            type: String,
        },
        profilePicture: {
            type: String,
            default: "/public/user/default.jpg",
        },
        citizenship: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: [true, "This number is already in use."],
        },
        area: {
            type: String,
            required: true,
        },
        availability: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tasker", taskerSchema);
