import React, { useState, useEffect } from "react";
import {
    Avatar,
    Button,
    TextField,
    Grid,
    Box,
    Container,
    Typography,
    Paper,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import CardMedia from "@mui/material/CardMedia";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import InnerNavbar from "../components/InnerNavbar";

const validationSchema = yup.object({
    name: yup.string().nullable(),
    email: yup.string().email("Enter a valid email").nullable(),
    number: yup.number().nullable(),
    area: yup.string().nullable(),
    description: yup.string().nullable(),
    availability: yup.boolean().nullable(),
});

export default function TaskerEdit() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [profileFile, setProfileFile] = useState();
    const [citizenshipFile, setCitizenshipFile] = useState();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: data.name || "",
            email: data.email || "",
            number: data.number || "",
            area: data.area || "",
            description: data.description || "",
            availability: data.availability || false,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    useEffect(() => {
        const fetchTasker = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/taskers/getTaskerById/${id}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Error fetching tasker data:", error);
            }
        };
        fetchTasker();
    }, [id]);

    const handleSubmit = async () => {
        try {
            const formdata = new FormData();
            formdata.append("name", formik.values.name);
            formdata.append("email", formik.values.email);
            formdata.append("number", formik.values.number);
            formdata.append("area", formik.values.area);
            formdata.append("description", formik.values.description);
            formdata.append("availability", formik.values.availability);
            formdata.append("profilePicture", profileFile);
            formdata.append("citizenship", citizenshipFile);

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
                withCredentials: true,
            };

            const response = await axios.put(
                `http://localhost:5000/api/taskers/updateTasker/${id}`,
                formdata,
                config
            );
            if (response.status === 200) {
                toast.success("Successfully Updated");
                setTimeout(() => {
                    navigate(`/taskers/taskerprofile/${id}`);
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
            <InnerNavbar userType="tasker" />

            <Container maxWidth="md">
                <Paper elevation={5} sx={{ p: 2 }}>
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
                                        name="area"
                                        label="Area"
                                        value={formik.values.area}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.area &&
                                            Boolean(formik.errors.area)
                                        }
                                        helperText={
                                            formik.touched.area &&
                                            formik.errors.area
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        name="description"
                                        label="Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.description &&
                                            Boolean(formik.errors.description)
                                        }
                                        helperText={
                                            formik.touched.description &&
                                            formik.errors.description
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={formik.values.availability}
                                        exclusive
                                        onChange={(event, newAvailability) => {
                                            if (newAvailability !== null) {
                                                formik.setFieldValue(
                                                    "availability",
                                                    newAvailability
                                                );
                                            }
                                        }}
                                        fullWidth
                                        sx={{
                                            "& .MuiToggleButtonGroup-grouped": {
                                                margin: "8px 0",
                                                border: 0,
                                                backgroundColor: "#fff",
                                                color: "black",
                                                "&:hover": {
                                                    backgroundColor: "#e0e0e0",
                                                },
                                                "&.Mui-selected": {
                                                    color: "white",
                                                    "&:hover": {
                                                        opacity: 0.9,
                                                    },
                                                },
                                            },
                                            "& .MuiToggleButtonGroup-grouped:first-of-type":
                                                {
                                                    "&.Mui-selected": {
                                                        backgroundColor:
                                                            "#4caf50",
                                                    },
                                                },
                                            "& .MuiToggleButtonGroup-grouped:last-of-type":
                                                {
                                                    "&.Mui-selected": {
                                                        backgroundColor:
                                                            "#f44336",
                                                    },
                                                },
                                        }}
                                    >
                                        <ToggleButton value={true}>
                                            Available
                                        </ToggleButton>
                                        <ToggleButton value={false}>
                                            Unavailable
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Profile Picture
                                    </Typography>
                                    <input
                                        type="file"
                                        name="profilePicture"
                                        onChange={(e) => {
                                            setProfileFile(e.target.files[0]);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" fontWeight={600}>
                                        Citizenship
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        sx={{ width: 400 }}
                                        image={`http://localhost:5000/images/${data.citizenship}`}
                                        alt="citizenship"
                                    />
                                    <input
                                        type="file"
                                        name="citizenship"
                                        onChange={(e) => {
                                            setCitizenshipFile(
                                                e.target.files[0]
                                            );
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
