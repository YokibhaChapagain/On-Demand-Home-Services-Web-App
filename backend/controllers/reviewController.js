const asyncHandler = require("express-async-handler");
const Review = require("../models/review");

const createReview = asyncHandler(async (req, res) => {
    const { description, rating, taskerId } = req.body;
    const userId = req.user.id;
    console.log(userId);

    if (!description || !rating || !taskerId) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const review = await Review.create({
        description,
        rating,
        taskerId,
        userId,
    });

    if (review) {
        res.status(201).json({
            _id: review.id,
            description: review.description,
            rating: review.rating,
            taskerId: review.taskerId,
            userId: review.userId,
            message: "Review added successfully!",
        });
    } else {
        res.status(400);
        throw new Error("Invalid review data");
    }
});

const getAllReviews = asyncHandler(async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate("taskerId", "name profilePicture")
            .populate("userId", "name");

        if (reviews) {
            res.status(200).json(reviews);
        } else {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("Could not fetch reviews!");
        }
    } catch (error) {
        res.status(500);
        throw new Error("Server Error: " + error.message);
    }
});

const getReviewsByTaskerId = asyncHandler(async (req, res) => {
    const taskerId = req.tasker.id;
    console.log(taskerId);
    try {
        const reviews = await Review.find({ taskerId }).populate(
            "userId",
            "name   profilePicture"
        );
        if (reviews) {
            res.status(200).json(reviews);
        } else {
            res.status(constants.VALIDATION_ERROR);
            throw new Error("Could not fetch reviews!");
        }
    } catch (error) {
        res.status(500);
        throw new Error("Server Error: " + error.message);
    }
});
module.exports = { createReview, getAllReviews, getReviewsByTaskerId };
