import React from "react";
import { Box } from "@mui/material";
import SignupLogin from "../components/SignupLogin";
import backgroundImage from "../assets/images/assembly.jpg";

export default function User() {
    const loginHref = "/user/login";
    const signupHref = "/user/signup";
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(6px)",
                    zIndex: -1,
                },
            }}
        >
            <SignupLogin loginHref={loginHref} signupHref={signupHref} />
        </Box>
    );
}
