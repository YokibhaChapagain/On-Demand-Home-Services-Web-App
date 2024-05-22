import React from "react";
import { useLocation } from "react-router-dom";
import {
    Avatar,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import InnerNavbar from "../components/InnerNavbar";

export default function TaskerReviews() {
    const location = useLocation();
    const { reviews } = location.state || { reviews: [] };

    return (
        <>
            <InnerNavbar userType={"tasker"} />
            <Box sx={{ textAlign: "center", m: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                    Your Reviews
                </Typography>
            </Box>
            <Container sx={{ mt: 4 }}>
                {reviews.map((review) => (
                    <Card
                        key={review.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Avatar
                            alt={review.name}
                            src={review.imgSrc}
                            sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{review.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {review.comment}
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
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>
    );
}
