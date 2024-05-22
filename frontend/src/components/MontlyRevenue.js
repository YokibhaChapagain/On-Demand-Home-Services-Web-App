import React from "react";
import { Typography, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";

function MonthlyRevenue({ data, options }) {
    const calculateTotalRevenue = () => {
        return data.datasets.reduce((acc, dataset) => {
            return acc + dataset.data.reduce((sum, value) => sum + value, 0);
        }, 0);
    };
    const totalRevenue = calculateTotalRevenue();
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
            <Typography variant="h4" sx={{ marginY: 1 }}>
                Rs {totalRevenue.toLocaleString()}
            </Typography>

            <Bar data={data} options={options} />
        </Paper>
    );
}

export default MonthlyRevenue;
