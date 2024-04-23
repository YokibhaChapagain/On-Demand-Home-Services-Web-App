import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChaletIcon from "@mui/icons-material/Chalet";

export default function InnerNavbar({ userType }) {
    const dashboardPath =
        userType === "tasker" ? "/taskers/dashboard" : "/users/dashboard";

    return (
        <AppBar
            position="static"
            sx={{
                background: "white",
                color: "#2c4834",
                mb: userType === "tasker" ? 7 : 0,
            }}
        >
            <Toolbar>
                <IconButton href={dashboardPath}>
                    <ArrowBackIcon />
                </IconButton>
                <ChaletIcon fontSize="large" />
                <Typography
                    variant="h5"
                    sx={{ flexGrow: 1 }}
                    fontWeight={600}
                    letterSpacing={1}
                >
                    Homify
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
