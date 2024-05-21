const Payment = require("../models/payment");
const asyncHandler = require("express-async-handler");

const getUpcomingTasks = asyncHandler(async (req, res) => {
    const taskerId = req.tasker.id;

    try {
        const payments = await Payment.find({
            taskerId: taskerId,
            status: true,
        })
            .populate({
                path: "userId",
                select: "name address number",
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

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { taskerId, userId, serviceId } = req.body;
    const { taskCompleted } = req.body;

    try {
        const payment = await Payment.findOne({
            taskerId: taskerId,
            userId: userId,
            serviceId: serviceId,
            status: true,
        });

        if (!payment) {
            return res.status(404).json({ message: "Task not found" });
        }

        payment.taskCompleted = taskCompleted;
        await payment.save();

        res.status(200).json({ message: "Task status updated successfully" });
    } catch (error) {
        console.error("Failed to update task status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { getUpcomingTasks, updateTaskStatus };
