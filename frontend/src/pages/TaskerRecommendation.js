import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Select,
    MenuItem,
    Typography,
    Avatar,
    Button,
    Card,
    CardContent,
    Grid,
    AppBar,
    Toolbar,
    Stack,
    Paper,
    Container,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ChaletIcon from "@mui/icons-material/Chalet";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InnerNavbar from "../components/InnerNavbar";
import axios from "axios";

export default function TaskerRecommendation() {
    const { state } = useLocation();
    const { data } = state;
    console.log(data);

    const [sortOrder, setSortOrder] = useState("recommendation");

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handlePayment = async (serviceId, rate, taskerId) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/payments/create-payment",
                {
                    serviceId: serviceId,
                    amount: rate,
                    taskerId: taskerId,
                },
                {
                    withCredentials: true,
                }
            );

            window.location.href = response.data.url;
        } catch (error) {
            console.error("Failed to initiate payment:", error);
            alert("Payment initiation failed. Please try again.");
        }
    };
    const sortedData = () => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return null;
        }
        switch (sortOrder) {
            case "priceLowestToHighest":
                return data.sort((a, b) => a.service.rate - b.service.rate);
            case "priceHighestToLowest":
                return data.sort((a, b) => b.service.rate - a.service.rate);
            default:
                return data;
        }
    };

    const taskers = sortedData();

    if (!taskers) {
        return (
            <>
                <AppBar
                    position="static"
                    sx={{ background: "white", color: "#2c4834" }}
                >
                    <Toolbar>
                        <ChaletIcon fontSize="large" />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            fontWeight={600}
                            letterSpacing={1}
                        >
                            Homify
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
                            <LocationOnIcon
                                sx={{ color: "teal", height: 150, width: 150 }}
                            />
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                fontWeight={600}
                                color={"teal"}
                                mb={8}
                            >
                                No Tasker Available
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                href="/users/booktask"
                                sx={{
                                    borderRadius: 2,
                                    mt: 3,
                                    py: 1.5,
                                    background: "#559b9f",
                                    ":hover": { background: "#88b9bc" },
                                }}
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </>
        );
    }

    return (
        <div>
            <InnerNavbar userType="user" />
            <AppBar
                position="static"
                sx={{
                    background: "white",
                    color: "grey",
                    marginBottom: 4,
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
                        Filter and Sort to find your Tasker. Then proceed to
                        payment.{" "}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                mx={4}
            >
                <Typography variant="h4" color="teal" fontWeight={600}>
                    Recommended Tasker
                </Typography>
                <Stack direction="row" spacing={2} alignItems={"center"}>
                    <Typography fontWeight={600}>Sorted by:</Typography>
                    <Select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        sx={{ borderRadius: "20px" }}
                    >
                        <MenuItem value="recommendation">
                            Recommendation
                        </MenuItem>
                        <MenuItem value="priceLowestToHighest">
                            Price: Lowest to Highest
                        </MenuItem>
                        <MenuItem value="priceHighestToLowest">
                            Price: Highest to Lowest
                        </MenuItem>
                    </Select>
                </Stack>
            </Box>
            {sortedData().map((recommendation, index) => (
                <Container maxWidth="large" sx={{ mt: 8 }}>
                    <Card
                        key={index}
                        variant="outlined"
                        sx={{ borderRadius: 4, mb: 2, boxShadow: 4 }}
                    >
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Avatar
                                        src={`http://localhost:5000/images/${recommendation.tasker.profilePicture}`}
                                        sx={{ width: 145, height: 145 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm marginTop={2}>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        fontWeight={600}
                                    >
                                        {recommendation.tasker.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {recommendation.service.name}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        st
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
                                    <Stack direction="row" alignItems="center">
                                        <LocationOnIcon
                                            sx={{
                                                color: "grey",
                                            }}
                                            fontSize="small"
                                        />
                                        <Typography
                                            variant="body2"
                                            color="grey"
                                        >
                                            {recommendation.tasker.area}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        color="teal"
                                        fontWeight={600}
                                    >
                                        Rs {""}
                                        {recommendation.service.rate}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: "teal",
                                        borderRadius: 4,
                                    }}
                                    onClick={() => {
                                        handlePayment(
                                            recommendation.service.id,
                                            recommendation.service.rate,
                                            recommendation.tasker._id
                                        );
                                    }}
                                >
                                    Select & Continue
                                </Button>
                            </Box>
                        </CardContent>
                        <Card
                            sx={{
                                borderRadius: "4",
                                background: "#F2F2F2",
                                p: 2,
                            }}
                        >
                            <Typography variant="body2" fontWeight={600}>
                                How can I help you?
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {recommendation.service.description}
                            </Typography>
                        </Card>
                    </Card>
                </Container>
            ))}
        </div>
    );
}
