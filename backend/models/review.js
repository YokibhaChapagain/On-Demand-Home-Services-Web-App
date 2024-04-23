const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        taskerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
