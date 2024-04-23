const express = require("express");
const {
    registerUser,
    loginUser,
    updateUser,
    logout,
    getUserById,
} = require("../controllers/userController");
const { upload } = require("../upload");
const {
    forgetPassword,
    resetPassword,
} = require("../controllers/forgetController");
const { getServices } = require("../controllers/serviceController");
const { getTaskerByFilter } = require("../controllers/taskerController");

const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.get("/getUserById/:id", getUserById);
router.post("/logout", logout);
router.post("/forgetPassword", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/getServices", getServices);
router.put("/updateUser/:id", upload.single("profilePicture"), updateUser);
router.get("/getTaskerByFilter", getTaskerByFilter);

module.exports = router;
