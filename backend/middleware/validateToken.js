const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    const {
        headers: { cookie },
    } = req;
    console.log("cookie: ", req.cookies.token);
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (req.cookies) {
        // if (authHeader && authHeader.startsWith("Bearer")) {
        // token = authHeader.split(" ")[1];
        token = req.cookies.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            if (decoded.user) {
                req.user = decoded.user;
            }
            if (decoded.tasker) {
                req.tasker = decoded.tasker;
            }
            next();
        });
    }

    if (!token) {
        res.status(400);
        throw new Error("User is not authorized or token is missing");
    }
});

module.exports = validateToken;
