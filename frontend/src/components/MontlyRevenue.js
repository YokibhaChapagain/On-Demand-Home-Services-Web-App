import React from "react";
import { Typography, Paper, Button } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Bar } from "react-chartjs-2";

function MonthlyRevenue({ data, options, onNavigate }) {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h6" fontWeight={600} color="teal">
                Monthly Revenue
            </Typography>
            <Typography variant="h4" sx={{ marginY: 2 }}>
                Rs 25,300
            </Typography>
            <Button
                startIcon={<AssessmentIcon />}
                variant="contained"
                onClick={onNavigate}
                sx={{
                    fontWeight: 600,
                    background: "teal",
                    ":hover": { background: "#88b9bc" },
                }}
            >
                View Details
            </Button>
            <Bar data={data} options={options} />
        </Paper>
    );
}

export default MonthlyRevenue;
