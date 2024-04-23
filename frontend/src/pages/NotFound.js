import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
    return (
        <Container
            sx={{
                justifyContent: "center",
            }}
        >
            <Stack spacing={2} alignItems="center" marginTop={12}>
                <Typography variant="h1" fontWeight={600} color="#559b9f">
                    404
                </Typography>
                <Typography variant="h5" fontWeight={600} color="#84746e">
                    Oops! The page you are looking for can't be found.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ background: "#559b9f" }}
                    href="/"
                >
                    Return to Homepage
                </Button>
            </Stack>
        </Container>
    );
}
