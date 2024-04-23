const mongoose = require("mongoose");

// Payment Schema
const paymentSchema = new mongoose.Schema(
    {
        status: {
            type: Boolean,
            default: false,
        },
        amount: {
            type: Number,
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
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
