const asyncHandler = require("express-async-handler");
const Service = require("../models/service");
const mongoose = require("mongoose");
const { constants } = require("../constants");

const createService = asyncHandler(async (req, res) => {
    const { name, rate, description } = req.body;
    // console.log(req.tasker.id);
    const taskerId = req.tasker.id;

    if (!name || !rate || !description) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("All fields are mandatory");
    }

    const service = await Service.create({
        name,
        rate,
        description,
        taskerId,
    });

    if (service) {
        res.status(201).json({
            _id: service.id,
            name: service.name,
            description: service.description,
            message: "Service added successfully!",
        });
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid service data");
    }
});

const getServiceById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid Id");
    }

    const service = await Service.findById(id);
    if (service) {
        res.status(200).json(service);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Couldn't find the service");
    }
});

const getServiceByTaskerId = asyncHandler(async (req, res) => {
    const { taskerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(taskerId)) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid Id");
    }

    const taskerservice = await Service.find({ taskerId: taskerId });
    if (taskerservice.length > 0) {
        res.status(200).json(taskerservice);
    } else {
        res.status(200).json({ message: "No services found for this tasker" });
    }
});

const getServices = asyncHandler(async (req, res) => {
    const services = await Service.find({});
    if (services) {
        res.status(200).json(services);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Could not fetch services!");
    }
});

const updateService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, rate, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid Id");
    }

    const service = await Service.findById(id);
    if (!service) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Service not found");
    }

    // Update the service fields
    service.name = name || service.name;
    service.rate = rate || service.rate;
    service.description = description || service.description;

    const updatedService = await service.save();
    res.status(200).json(updatedService);
});

const deleteService = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error("Invalid Id");
    }

    const service = await Service.findById(id);
    if (!service) {
        res.status(400);
        throw new Error("Service not found");
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted successfully" });
});

module.exports = {
    createService,
    getServices,
    getServiceById,
    getServiceByTaskerId,
    updateService,
    deleteService,
};
