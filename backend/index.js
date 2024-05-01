require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOption));

connectDB();
app.use(express.json());

app.use(cookieParser());

//middleware
app.use(errorHandler);
app.use("/images", express.static(path.join(__dirname, "public")));
//routes
app.get("/", (req, res) => {
    res.status(200).json("Welcome to Home-Services Application");
});
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/taskers", require("./routes/taskerRoute"));
app.use("/api/payments", require("./routes/paymentRoute"));

app.listen(process.env.PORT, () => {
    console.log("Working on...", process.env.PORT);
});
