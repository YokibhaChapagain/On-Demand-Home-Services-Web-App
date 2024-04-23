import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Box, Typography, TextField } from "@mui/material";
import backgroundImage from "../assets/images/assembly.jpg";

export default function ForgetPassword() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
        }),
        onSubmit: (values) => {
            axios
                .post(`http://localhost:5000/api/users/forgetPassword`, values)
                .then((response) => {
                    toast.success("Email sent successfully");
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        toast.error("Email not found");
                    } else {
                        toast.error("Server error");
                    }
                });
        },
    });
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
                    marginTop={20}
                    padding={8}
                    borderRadius={4}
                    bgcolor="#e7dfd8"
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
                        marginBottom={2}
                    >
                        Homify
                    </Typography>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        letterSpacing={1}
                        color="#84746e"
                        marginY={2}
                    >
                        Reset Password
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        color="grey"
                        marginBottom={4}
                    >
                        Enter your email and we'll send you instructions to
                        reset your password{" "}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            sx={{ mb: 3 }}
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

                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: 4,
                                background: "#559b9f",
                                ":hover": {
                                    background: "#88b9bc",
                                },
                                mt: 2,
                            }}
                            size="large"
                        >
                            Send Password
                        </Button>
                    </form>
                </Box>
                <ToastContainer />
            </Box>
        </>
    );
}
