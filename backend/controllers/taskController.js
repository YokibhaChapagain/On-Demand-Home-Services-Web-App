const Payment = require("../models/payment");
const asyncHandler = require("express-async-handler");

const getUpcomingTasks = asyncHandler(async (req, res) => {
    const taskerId = req.tasker.id;
    console.log(taskerId);

    try {
        const payments = await Payment.find({
            taskerId: taskerId,
            status: true,
        })
            .populate({
                path: "userId",
                select: "name address",
            })
            .populate({
                path: "serviceId",
                select: "name",
            });

        res.json(payments);
    } catch (error) {
        console.error("Failed to fetch completed tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { getUpcomingTasks };
