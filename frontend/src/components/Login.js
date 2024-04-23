import React from "react";
import {
    Button,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAuth } from "../AuthContext";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean(),
});

export default function Login({ user }) {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema,
        onSubmit: () => {
            submitHandler();
        },
    });

    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:5000/api/${user}/login`,
                {
                    email: formik.values.email,
                    password: formik.values.password,
                },
                { withCredentials: true }
            );
            const { success, id } = data;
            if (success) {
                login(id);
                navigate(`/${user}/dashboard`);
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <>
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
                    marginBottom={4}
                >
                    Homify
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
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
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
                            formik.touched.password && formik.errors.password
                        }
                    />

                    <FormControlLabel
                        sx={{ mr: 28 }}
                        control={<Checkbox value="remember" />}
                        label="Remember me"
                    />
                    <Typography
                        variant="body1"
                        color="#559b9f"
                        fontWeight="600"
                        component={Link}
                        to="/forget-password"
                    >
                        Forgot password?
                    </Typography>
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
                        Log in
                    </Button>
                </form>
            </Box>
            <ToastContainer />
        </>
    );
}
