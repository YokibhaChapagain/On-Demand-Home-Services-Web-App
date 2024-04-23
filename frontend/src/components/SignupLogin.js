import React from "react";
import { Button, Box, Typography } from "@mui/material";

export default function SignupLogin({ loginHref, signupHref }) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth={500}
            justifyContent="center"
            margin="auto"
            marginTop={20}
            padding={8}
            borderRadius={4}
            bgcolor="#e7dfd8"
            boxShadow={"5px 5px 10px #ccc"}
            sx={{
                ":hover": {
                    boxShadow: "10px 10px 20px #ccc",
                },
            }}
        >
            <Typography
                variant="h4"
                fontWeight={600}
                letterSpacing={1}
                color="#84746e"
            >
                Homify
            </Typography>
            <Button
                variant="contained"
                fullWidth
                href={loginHref}
                sx={{
                    mt: 4,
                    mb: 2,
                    borderRadius: 2,
                    background: "white",
                    color: "#559b9f",
                    fontWeight: 600,
                    ":hover": {
                        background: "#88b9bc",
                        color: "white",
                    },
                }}
                size="large"
            >
                Log in
            </Button>
            <Button
                variant="contained"
                fullWidth
                href={signupHref}
                sx={{
                    mb: 3,
                    borderRadius: 2,
                    background: "#559b9f",
                    ":hover": {
                        background: "#88b9bc",
                    },
                }}
                size="large"
            >
                Sign up
            </Button>
            <Typography variant="body1">
                By signing up you agree to our{" "}
                <Typography display="inline" color="#559b9f" fontWeight="600">
                    Terms of Use
                </Typography>{" "}
                and
                <Typography display="inline" color="#559b9f" fontWeight="600">
                    {" "}
                    Privacy Policy
                </Typography>
            </Typography>
        </Box>
    );
}
