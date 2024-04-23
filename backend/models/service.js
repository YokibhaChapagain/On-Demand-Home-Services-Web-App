const mongoose = require("mongoose");

// Service Schema
const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        taskerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
