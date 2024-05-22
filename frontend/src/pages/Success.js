import React from "react";
import { Typography, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate("/users/dashboard");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            textAlign="center"
        >
            <CheckCircleOutlineIcon style={{ fontSize: 100, color: "green" }} />
            <Typography variant="h4" gutterBottom>
                Payment Successful
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToDashboard}
                sx={{
                    marginTop: 2,
                    backgroundColor: "green",
                    ":hover": { backgroundColor: "darkgreen" },
                }}
            >
                Go Back to Dashboard
            </Button>
        </Box>
    );
}
