import React from "react";
import { AppBar, Toolbar, Typography, Stack, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChaletIcon from "@mui/icons-material/Chalet";
export default function LandingNavbar() {
    return (
        <AppBar
            position="static"
            sx={{ background: "#e7dfd8", color: "black" }}
        >
            <Toolbar>
                <IconButton color="inherit">
                    <ChaletIcon fontSize="large" />
                </IconButton>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    fontWeight={600}
                    letterSpacing={1}
                >
                    Homify
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="inherit" href="/services">
                        Services
                    </Button>
                    <Button variant="inherit" href="/user">
                        Login/ Signup
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            background: "#dbccbe",
                            color: "black",
                            "&:hover": {
                                backgroundColor: "#b4a49c",
                            },
                        }}
                        href="/tasker"
                    >
                        Become a Tasker
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
