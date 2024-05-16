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
            ref: "Tasker",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Service",
        },
        taskCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
