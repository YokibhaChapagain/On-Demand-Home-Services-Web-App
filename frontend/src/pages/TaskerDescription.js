import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Divider,
    Button,
    Stack,
    CardMedia,
    Grid,
    CardActions,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CircleIcon from "@mui/icons-material/Circle";
import InnerNavbar from "../components/InnerNavbar";

export default function TaskerDescription() {
    const { id } = useParams();

    const [tasker, setTasker] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchTaskerDetails = async () => {
            try {
                const { data: taskerData } = await axios.get(
                    `http://localhost:5000/api/taskers/getTaskerById/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                setTasker(taskerData);
                const { data: serviceData } = await axios.get(
                    `http://localhost:5000/api/taskers/getServiceByTaskerId/${id}`
                );
                setServices(serviceData);
            } catch (error) {
                console.error("Failed to fetch taskers");
            }
        };
        fetchTaskerDetails();
    }, [id]);

    return (
        <>
            <Box sx={{ minHeight: "100vh", bgcolor: "#F2F2F2" }}>
                <InnerNavbar userType="user" />
                {tasker ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            p: 4,
                            alignItems: "flex-start",
                        }}
                    >
                        <Stack width={600}>
                            <Card
                                sx={{
                                    m: 2,
                                    p: 2,
                                    mr: 4,
                                    display: "flex",
                                    alignItems: "center",
                                    height: "18vh",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: "5%",
                                    }}
                                    image={`http://localhost:5000/images/${tasker.profilePicture}`}
                                    alt={tasker.name}
                                />
                                <Stack
                                    sx={{ mx: 2, width: "100%" }}
                                    alignItems="start"
                                >
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        fontWeight={600}
                                    >
                                        {tasker.name}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <EmailIcon sx={{ color: "teal" }} />
                                        <Typography variant="body2">
                                            {tasker.email}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <LocalPhoneIcon
                                            sx={{ color: "teal" }}
                                        />
                                        <Typography variant="body2">
                                            {tasker.number}
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <StarIcon sx={{ color: "black" }} />
                                        <Typography
                                            variant="body2"
                                            color="grey"
                                        >
                                            4.5 (16 reviews)
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Card>
                            <Card
                                sx={{
                                    m: 2,
                                    p: 2,
                                    mr: 4,
                                    height: "50vh",
                                }}
                            >
                                <Typography variant="h6" fontWeight={600}>
                                    About me
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {tasker.description}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body2" ml={1} mb={2}>
                                    Working in {tasker.area}, Nepal
                                </Typography>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <VerifiedUserIcon sx={{ color: "grey" }} />
                                    <Typography variant="body2">
                                        ID Verified
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    mb={2}
                                >
                                    <DateRangeIcon sx={{ color: "grey" }} />
                                    <Typography variant="body2">
                                        Tasker Since 2023
                                    </Typography>
                                </Stack>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mt: 1,
                                    }}
                                >
                                    <CircleIcon
                                        sx={{
                                            color: tasker.availability
                                                ? "green"
                                                : "red",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ ml: 0.5 }}
                                    >
                                        {tasker.availability
                                            ? "Available"
                                            : "Unavailable"}
                                    </Typography>
                                </Box>
                            </Card>
                        </Stack>
                        <Grid container spacing={1} mt={1.5}>
                            {services.length > 0 ? (
                                services.map((service, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card
                                            sx={{
                                                width: "100%",
                                                mb: 1,
                                            }}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Stack>
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                            fontWeight={600}
                                                        >
                                                            {service.name} for
                                                            Rs {service.rate}
                                                        </Typography>
                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                        >
                                                            <StarIcon
                                                                sx={{
                                                                    color: "grey",
                                                                }}
                                                                fontSize="small"
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                color="grey"
                                                            >
                                                                4.5 (16 reviews)
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <CardActions>
                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            sx={{
                                                                background:
                                                                    "teal",
                                                            }}
                                                        >
                                                            Select & Continue
                                                        </Button>
                                                    </CardActions>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ mt: 2 }}
                                                >
                                                    {service.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography>No services found</Typography>
                            )}
                        </Grid>
                    </Box>
                ) : (
                    <Typography variant="body1" align="center">
                        Loading...
                    </Typography>
                )}
            </Box>
        </>
    );
}
