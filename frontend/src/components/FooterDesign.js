import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import Describe from "../assets/images/describe.PNG";
import Users from "../assets/images/users.png";
import Payment from "../assets/images/payment.jpg";

const avatarItems = [
    {
        name: "1. Describe Your Task",
        image: Describe,
        description:
            "Tell us what you need done, when and where it works for you",
    },
    {
        name: "2. Choose Your Tasker",
        image: Users,
        description: "Browse trusted Taskers by skills, reviews, and price.",
    },
    {
        name: "3. Get It Done",
        image: Payment,
        description:
            "Your Tasker arrives and gets the job done. Pay securely and leave the review.",
    },
];

export default function FooterDesign() {
    return (
        <>
            <Typography
                variant="h4"
                fontWeight={600}
                textAlign={"center"}
                marginBottom={2}
            >
                How it works
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {avatarItems.map((item, index) => (
                    <Grid item xs={12} sm={3} key={index}>
                        <Box textAlign="center">
                            <Avatar
                                src={item.image}
                                alt={item.name}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    margin: "0 auto",
                                    marginBottom: 1,
                                }}
                            />
                            <Typography variant="h6" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography variant="body1" color="grey">
                                {item.description}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            ;
        </>
    );
}
