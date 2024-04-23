import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import {
    Typography,
    Button,
    TextField,
    Paper,
    Container,
    Stack,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import InnerNavbar from "../components/InnerNavbar";
import { useAuth } from "../AuthContext";

export default function EditService() {
    const { id } = useParams();
    const { userId } = useAuth();

    const [service, setService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/taskers/getServiceById/${id}`
                );
                setService(response.data);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };
        fetchService();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.put(
                `http://localhost:5000/api/taskers/updateService/${id}`,
                values
            );
            setTimeout(() => {
                navigate(`/taskers/myservices/${userId}`);
            }, 1000);
            toast.success("Details Updated successfully");
        } catch (error) {
            toast.error("Cannot Update the Details");
        } finally {
            setSubmitting(false);
        }
    };

    if (!service) {
        return <Typography variant="h2">Loading...</Typography>;
    }

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
                        Edit Your Service
                    </Typography>
                    <Formik initialValues={service} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Stack spacing={2} sx={{ width: "100%" }}>
                                    <Field
                                        type="text"
                                        name="name"
                                        as={TextField}
                                        label="Name"
                                    />
                                    <Field
                                        name="rate"
                                        as={TextField}
                                        label="Rate"
                                    />
                                    <Field
                                        type="text"
                                        name="description"
                                        as={TextField}
                                        label="Description"
                                        multiline
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            background: "teal",
                                            borderRadius: 2,
                                            ":hover": {
                                                background: "#88b9bc",
                                            },
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Updating..."
                                            : "Update"}
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Container>
            <ToastContainer />
        </>
    );
}
