const express = require("express");
const {
    registerTasker,
    loginTasker,
    updateTasker,
    getTaskers,
    getTaskerById,
} = require("../controllers/taskerController");
const { logout } = require("../controllers/userController");
const {
    createService,
    getServices,
    getServiceById,
    getServiceByTaskerId,
    updateService,
    deleteService,
} = require("../controllers/serviceController");
const { upload } = require("../upload");

const validateToken = require("../middleware/validateToken");

const router = express.Router();
const uploadFields = upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "citizenship", maxCount: 1 },
]);
router.post("/register", uploadFields, registerTasker);
router.post("/login", loginTasker);
router.post("/logout", logout);
router.put("/updateTasker/:id", uploadFields, updateTasker);
router.get("/getTaskers", getTaskers);
router.get("/getTaskerById/:id", getTaskerById);
router.post("/createService", validateToken, createService);
router.get("/getServices", getServices);
router.get("/getServiceById/:id", getServiceById);
router.get("/getServiceByTaskerId/:taskerId", getServiceByTaskerId);
router.put("/updateService/:id", updateService);
router.delete("/deleteService/:id", deleteService);

module.exports = router;
