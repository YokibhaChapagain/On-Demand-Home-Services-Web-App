const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const forgetPassword = async (req, res) => {
    try {
        // Find the user by email
        const { email } = req.body;
        const user = await User.findOne({ email });

        // If user not found, send error message
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Generate a unique JWT token for the user that contains the user's id
        const token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );

        // Send the token to the user's email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_APP_EMAIL,
            },
        });

        // Email configuration
        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:3000/reset-password/${token}">http://localhost:3000/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            res.status(200).send({ message: "Email sent" });
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        // Verify the token sent by the user
        const decodedToken = jwt.verify(
            req.params.token,
            process.env.ACCESS_TOKEN_SECRET
        );

        // If the token is invalid, return an error
        if (!decodedToken) {
            return res.status(401).send({ message: "Invalid token" });
        }

        // find the user with the id from the token
        const user = await User.findOne({ _id: decodedToken.userId });
        if (!user) {
            return res.status(401).send({ message: "no user found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password, clear reset token and expiration time
        user.password = hashedPassword;
        await user.save();

        // Send success response
        res.status(200).send({ message: "Password updated" });
    } catch (err) {
        // Send error response if any error occurs
        res.status(500).send({ message: err.message });
    }
};

module.exports = { forgetPassword, resetPassword };
