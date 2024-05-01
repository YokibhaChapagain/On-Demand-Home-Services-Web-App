const express = require("express");
const { createPayment } = require("../controllers/paymentController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/create-payment", validateToken, createPayment);
module.exports = router;
