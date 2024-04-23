const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("MongoDB Connected");
    } catch (e) {
        console.log(e);
        process.exit(0);
    }
};

module.exports = connectDB;
