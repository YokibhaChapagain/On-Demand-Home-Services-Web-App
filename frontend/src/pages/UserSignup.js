import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/assembly.jpg";

const validationSchema = yup.object({
    name: yup.string().required("Full Name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 6 characters, one uppercase,one lowercase, one digit and one special character"
        ),
    confirmpassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Password doesn't match"),
    number: yup.number().required("Number is required"),
    address: yup.string().required("Address is required"),
});

export default function UserSignup() {
    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            number: "",
            address: "",
        },
        validationSchema,
        onSubmit: () => {
            handleSubmit();
        },
    });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", formik.values.name);
            formdata.append("email", formik.values.email);
            formdata.append("password", formik.values.password);
            formdata.append("number", formik.values.number);
            formdata.append("address", formik.values.address);
            formdata.append("profilePicture", file);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
                withCredentials: true,
            };

            const response = await axios.post(
                "http://localhost:5000/api/users/register",
                formdata,
                config
            );
            const { status } = response;
            if (status === 201) {
                toast.success(response);
                navigate("/user/login");
            } else {
                toast.error(`Error: `);
            }
        } catch (err) {
            toast.error(`${err.message}`);
        }
    };
    return (
        <>
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        filter: "blur(6px)",
                        zIndex: -1,
                    },
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    maxWidth={500}
                    justifyContent="center"
                    margin="auto"
                    marginTop={4}
                    padding={8}
                    borderRadius={4}
                    bgcolor="white"
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={600}
                        letterSpacing={1}
                        color="#84746e"
                        marginBottom={4}
                    >
                        Homify
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Full Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            sx={{ my: 2 }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <TextField
                            fullWidth
                            id="confirmpassword"
                            name="confirmpassword"
                            label="Confirm Password"
                            type="password"
                            sx={{ my: 2 }}
                            value={formik.values.confirmpassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmpassword &&
                                Boolean(formik.errors.confirmpassword)
                            }
                            helperText={
                                formik.touched.confirmpassword &&
                                formik.errors.confirmpassword
                            }
                        />
                        <Typography className="items-start">
                            Profile Picture:
                        </Typography>
                        <TextField
                            type="file"
                            name="profilePicture"
                            fullWidth
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}
                        />
                        <TextField
                            fullWidth
                            id="number"
                            name="number"
                            label="Phone Number"
                            sx={{ my: 2 }}
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.number &&
                                Boolean(formik.errors.number)
                            }
                            helperText={
                                formik.touched.number && formik.errors.number
                            }
                        />
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.address &&
                                Boolean(formik.errors.address)
                            }
                            helperText={
                                formik.touched.address && formik.errors.address
                            }
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: 2,
                                background: "#559b9f",
                                ":hover": {
                                    background: "#88b9bc",
                                },
                                mt: 2,
                            }}
                            size="large"
                        >
                            Sign up
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
}
