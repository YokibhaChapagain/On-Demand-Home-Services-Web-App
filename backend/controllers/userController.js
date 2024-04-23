const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../constants");
const mongoose = require("mongoose");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, number, address } = req.body;
    if (!name || !email || !password || !number || !address) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are mandatory");
    }
    //Checking if the user already exists in the database
    const userAvailable = await User.findOne({ name });
    if (userAvailable) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User already exists!");
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const picture = req.file.filename;

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        number,
        address,
        profilePicture: picture,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            message: "User created successfully!",
        });
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

        const accessToken = jwt.sign(
            {
                user: {
                    id: user._id,
                    name: user.name,
                    type: "user",
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "2h",
            }
        );
        res.cookie("token", accessToken, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({
            name: user.name,
            id: user.id,
            type: "user",
            accessToken,
            success: true,
        });
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid login credentials!");
    }
});

const logout = (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token", { path: "/" });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(constants.VALIDATION_ERROR).json({
            message: "Error logging out",
        });
    }
};
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, number, address } = req.body;
    let picture;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Id");
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("User not found");
    }

    if (req.file) {
        picture = req.file.filename;
    }

    // Update the user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;
    user.address = address || user.address;
    if (picture) {
        user.profilePicture = picture;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
});

const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid Id");
    }

    const user = await User.findById(id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Couldn't find the user");
    }
});

module.exports = { registerUser, loginUser, updateUser, logout, getUserById };
