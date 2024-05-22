import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
} from "@mui/material";
import axios from "axios";
import InnerNavbar from "../components/InnerNavbar";
import { useAuth } from "../AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function AllReviews() {
    const [reviews, setReviews] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/reviews/getallreview",
                    {
                        withCredentials: true,
                    }
                );
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
                toast.error("Failed to fetch reviews");
            }
        };

        fetchReviews();
    }, [userId]);
    return (
        <>
            <ToastContainer />
            <InnerNavbar userType={"user"} />
            <Box sx={{ textAlign: "center", m: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                    Reviews Posted{" "}
                </Typography>
            </Box>
            <Container sx={{ mt: 4 }}>
                {reviews.map((review) => (
                    <Card
                        key={review._id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Avatar
                            alt={review.taskerId.name}
                            src={`http://localhost:5000/images/${review.taskerId.profilePicture}`}
                            sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">
                                {review.taskerId.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {review.description}
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    my: 1,
                                }}
                            >
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{
                                            color:
                                                index < review.rating
                                                    ? "#ffc107"
                                                    : "#e4e5e9",
                                            fontSize: 24,
                                        }}
                                    >
                                        ★
                                    </Box>
                                ))}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                From: {review.userId.name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>
    );
}
