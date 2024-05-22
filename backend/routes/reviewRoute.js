const express = require("express");
const {
    createReview,
    getAllReviews,
    getReviewsByTaskerId,
} = require("../controllers/reviewController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/addreview", validateToken, createReview);

router.get("/getallreview", getAllReviews);
router.get("/reviewById/:id", validateToken, getReviewsByTaskerId);

module.exports = router;
