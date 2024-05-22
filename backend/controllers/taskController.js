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

const getCompletedTasksDetails = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const payments = await Payment.find({
            userId: userId,
            taskCompleted: true,
            status: true,
        }).populate("taskerId serviceId");

        if (!payments.length) {
            return res
                .status(404)
                .json({ message: "No completed tasks found for this user." });
        }

        const taskDetails = payments.map((payment) => ({
            tasker: payment.taskerId,
            service: payment.serviceId,
        }));

        res.status(200).json(taskDetails);
    } catch (error) {
        console.error("Error fetching completed tasks details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = {
    getUpcomingTasks,
    updateTaskStatus,
    getCompletedTasksDetails,
};
