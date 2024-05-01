const asyncHandler = require("express-async-handler");
const Tasker = require("../models/tasker");
const Service = require("../models/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../constants");
const mongoose = require("mongoose");

const registerTasker = asyncHandler(async (req, res) => {
    const citizenship = req.files.citizenship[0].filename;
    const { name, email, password, number, area, description } = req.body;
    if (!name || !email || !password || !citizenship || !number || !area) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are mandatory");
    }

    //Checking if the tasker already exists in the database
    const taskerAvailable = await Tasker.findOne({ name });
    if (taskerAvailable) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Tasker already exists!");
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const picture = req.files.profilePicture[0].filename;
    const citizenship_pic = citizenship;

    const tasker = await Tasker.create({
        name,
        email,
        password: hashedPassword,
        citizenship: citizenship_pic,
        number,
        area,
        description,
        profilePicture: picture,
    });

    if (tasker) {
        res.status(201).json({
            _id: tasker.id,
            name: tasker.name,
            message: "Tasker created successfully!",
        });
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid tasker data");
    }
});

//Login logic
const loginTasker = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are mandatory");
    }

    const tasker = await Tasker.findOne({ email });

    if (tasker && (await bcrypt.compare(password, tasker.password))) {
        console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

        const accessToken = jwt.sign(
            {
                tasker: {
                    id: tasker._id,
                    name: tasker.name,
                    type: "tasker",
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
            name: tasker.name,
            id: tasker.id,
            type: "tasker",
            accessToken,
            success: true,
        });
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid login credentials!");
    }
});

const updateTasker = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, number, area, description, availability } = req.body;
    let profilePicture, citizenship;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Id");
    }

    const tasker = await Tasker.findById(id);
    if (!tasker) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Tasker not found");
    }

    // Check if req.files exist and assign the filenames if available
    if (req.files) {
        profilePicture = req.files.profilePicture
            ? req.files.profilePicture[0].filename
            : undefined;
        citizenship = req.files.citizenship
            ? req.files.citizenship[0].filename
            : undefined;
    }

    // Update the tasker fields
    tasker.name = name || tasker.name;
    tasker.email = email || tasker.email;
    tasker.number = number || tasker.number;
    tasker.area = area || tasker.area;
    tasker.description = description || tasker.description;
    tasker.availability = availability || tasker.availability;

    // Only update the profilePicture and citizenship if they are defined
    if (profilePicture) {
        tasker.profilePicture = profilePicture;
    }
    if (citizenship) {
        tasker.citizenship = citizenship;
    }

    const updatedTasker = await tasker.save();
    res.status(200).json(updatedTasker);
});

const getTaskers = asyncHandler(async (req, res) => {
    const taskers = await Tasker.find({});
    if (taskers) {
        res.status(200).json(taskers);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Could not fetch taskers!");
    }
});

const getTaskerById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid Id");
    }

    const tasker = await Tasker.findById(id);
    if (tasker) {
        res.status(200).json(tasker);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Couldn't find the tasker");
    }
});

const getTaskerByFilter = asyncHandler(async (req, res) => {
    const { serviceName, area } = req.query;
    try {
        const services = await Service.find({ name: serviceName });

        const taskerIds = services.map((service) => service.taskerId);

        const matchingTaskers = await Tasker.find({
            _id: { $in: taskerIds },
            area: area,
            availability: true,
        });

        // Check if no taskers were found
        if (matchingTaskers.length === 0) {
            return res.json([]);
        }
        const response = matchingTaskers.map((tasker) => {
            const matchingService = services.find(
                (service) => String(service.taskerId) === String(tasker._id)
            );
            return {
                tasker: {
                    _id: tasker._id,
                    name: tasker.name,
                    email: tasker.email,
                    profilePicture: tasker.profilePicture,
                    area: tasker.area,
                    availability: tasker.availability,
                    number: tasker.number,
                },
                service: {
                    id: matchingService.id,
                    name: matchingService.name,
                    rate: matchingService.rate,
                    description: matchingService.description,
                },
            };
        });

        res.json(response);
    } catch (err) {
        res.status(constants.VALIDATION_ERROR).json({ message: err.message });
    }
});

module.exports = {
    registerTasker,
    loginTasker,
    updateTasker,
    getTaskers,
    getTaskerById,
    getTaskerByFilter,
};
