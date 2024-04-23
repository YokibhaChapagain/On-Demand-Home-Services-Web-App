import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Button, Box, Typography, TextField } from "@mui/material";
import backgroundImage from "../assets/images/assembly.jpg";

export default function ResetPassword() {
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required("Required").min(6, "Too Short!"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values) => {
            const { newPassword } = values;
            const token = window.location.pathname.split("/").pop();
            console.log(token);

            axios
                .post(
                    `http://localhost:5000/api/users/reset-password/${token}`,
                    { newPassword: newPassword },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = "/user/login";
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Your link has expired");
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
                        Enter new password thats different from previously used.
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                            }
                            helperText={
                                formik.touched.newPassword &&
                                formik.errors.newPassword
                            }
                        />
                        <TextField
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            sx={{ my: 2 }}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
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
                            Reset Password
                        </Button>
                    </form>
                </Box>
                <ToastContainer />
            </Box>
        </>
    );
}
