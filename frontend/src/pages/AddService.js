import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, TextField, Container, Typography, Paper } from "@mui/material";

import { useAuth } from "../AuthContext";
import InnerNavbar from "../components/InnerNavbar";

const validationSchema = yup.object({
    name: yup.string().required("Service Name is required"),
    rate: yup.string().required("Service Rate is required"),
    description: yup.string().required("Description is required"),
});

export default function AddService() {
    const { userId } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: "",
            rate: "",
            description: "",
        },
        validationSchema,
        onSubmit: () => {
            submitHandler();
        },
    });
    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", formik.values.name);
            formdata.append("rate", formik.values.rate);
            formdata.append("description", formik.values.description);

            const response = await axios.post(
                "http://localhost:5000/api/taskers/createService",

                {
                    name: formik.values.name,
                    rate: formik.values.rate,
                    description: formik.values.description,
                },
                { withCredentials: true }
            );
            const { status } = response;
            if (status === 201) {
                toast.success("Service Added successfully");
                setTimeout(() => {
                    navigate(`/taskers/myservices/${userId}`);
                }, 1000);
            } else {
                toast.error(`Error: `);
            }
        } catch (err) {
            toast.error(`${err.message}`);
        }
    };

    return (
        <>
            <InnerNavbar userType="tasker" />
            <Container maxWidth="md" sx={{ marginTop: 12 }}>
                <Paper elevation={5} sx={{ p: 4 }}>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        fontWeight={600}
                        color={"teal"}
                        mb={8}
                    >
                        Add New Service
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Service Name"
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
                            name="rate"
                            label="Rate"
                            sx={{ my: 2 }}
                            value={formik.values.rate}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.rate &&
                                Boolean(formik.errors.rate)
                            }
                            helperText={
                                formik.touched.rate && formik.errors.rate
                            }
                        />

                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            sx={{ my: 2 }}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description &&
                                formik.errors.description
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
                            Add Service
                        </Button>
                    </form>
                </Paper>
            </Container>
            <ToastContainer />
        </>
    );
}
