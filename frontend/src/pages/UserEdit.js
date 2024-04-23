import React, { useState, useEffect } from "react";
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Container,
    Paper,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InnerNavbar from "../components/InnerNavbar";

const validationSchema = yup.object({
    name: yup.string().nullable(),
    email: yup.string().email("Enter a valid email").nullable(),
    number: yup.number().nullable(),
    address: yup.string().nullable(),
});

export default function UserEdit() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [file, setFile] = useState();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: data.name || "",
            email: data.email || "",
            number: data.number || "",
            address: data.address || "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/getUserById/${id}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", formik.values.name);
            formdata.append("email", formik.values.email);
            formdata.append("number", formik.values.number);
            formdata.append("address", formik.values.address);
            formdata.append("profilePicture", file);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
                withCredentials: true,
            };

            const response = await axios.put(
                `http://localhost:5000/api/users/updateUser/${id}`,
                formdata,
                config
            );
            if (response.status === 200) {
                toast.success("Successfully Updated");
                setTimeout(() => {
                    navigate(`/users/userprofile/${id}`);
                }, 1000);
            } else {
                toast.error("Update failed with status: " + response.status);
            }
        } catch (err) {
            toast.error("Update error: " + err.message);
        }
    };
    return (
        <>
            <InnerNavbar userType="user" />
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Paper elevation={5} sx={{ p: 4 }}>
                    <Box
                        sx={{
                            marginTop: 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {data && (
                            <Avatar
                                src={`http://localhost:5000/images/${data.profilePicture}`}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    margin: "0 auto",
                                }}
                            ></Avatar>
                        )}

                        <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="name"
                                        fullWidth
                                        label="Full Name"
                                        autoFocus
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.name &&
                                            Boolean(formik.errors.name)
                                        }
                                        helperText={
                                            formik.touched.name &&
                                            formik.errors.name
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Number"
                                        name="number"
                                        value={formik.values.number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.number &&
                                            Boolean(formik.errors.number)
                                        }
                                        helperText={
                                            formik.touched.number &&
                                            formik.errors.number
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.email &&
                                            Boolean(formik.errors.email)
                                        }
                                        helperText={
                                            formik.touched.email &&
                                            formik.errors.email
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="address"
                                        label="Address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.address &&
                                            Boolean(formik.errors.address)
                                        }
                                        helperText={
                                            formik.touched.address &&
                                            formik.errors.address
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    background: "teal",
                                    ":hover": {
                                        background: "#88b9bc",
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <ToastContainer />
        </>
    );
}
