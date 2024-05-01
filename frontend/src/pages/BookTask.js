import React, { useState } from "react";
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    TextField,
    Container,
    Box,
    Paper,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InnerNavbar from "../components/InnerNavbar";

const validationSchema = yup.object({
    service: yup.string().required("Service is required"),
    area: yup
        .string()
        .oneOf(["Kathmandu", "Lalitpur", "Bhaktapur"], "Area out of range")
        .required("Area is required"),
});

export default function BookTask() {
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();
    console.log(responseData);
    const formik = useFormik({
        initialValues: {
            service: "",
            area: "",
        },
        validationSchema,
        onSubmit: () => {
            submitHandler();
        },
    });
    async function submitHandler() {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/users/getTaskerByFilter?serviceName=${formik.values.service}&area=${formik.values.area}`
            );
            setResponseData(data);
            navigate("/users/booktask/recommendation", { state: { data } });
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <>
            <InnerNavbar userType="user" />
            <AppBar
                position="static"
                sx={{
                    background: "white",
                    color: "grey",
                    alignItems: "center",
                }}
            >
                <Toolbar>
                    <BorderColorIcon fontSize="small" />
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        letterSpacing={1}
                        ml={2}
                    >
                        Tell us about your task. We use these details to show
                        Taskers in your area who fit your needs{" "}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={5} sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "50vh",
                        }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            fontWeight={600}
                            color={"teal"}
                            mb={8}
                        >
                            Your Service Detail
                        </Typography>
                        <form
                            onSubmit={formik.handleSubmit}
                            style={{ width: "100%" }}
                        >
                            <TextField
                                fullWidth
                                name="service"
                                label="Service Name"
                                sx={{ mb: 2 }}
                                value={formik.values.service}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.service &&
                                    Boolean(formik.errors.service)
                                }
                                helperText={
                                    formik.touched.service &&
                                    formik.errors.service
                                }
                            />
                            <TextField
                                fullWidth
                                name="area"
                                label="Area"
                                sx={{ mb: 2 }}
                                value={formik.values.area}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.area &&
                                    Boolean(formik.errors.area)
                                }
                                helperText={
                                    formik.touched.area && formik.errors.area
                                }
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    borderRadius: 2,
                                    mt: 3,
                                    py: 1.5,
                                    background: "#559b9f",
                                    ":hover": { background: "#88b9bc" },
                                }}
                            >
                                Continue
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}
