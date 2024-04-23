import React from "react";
import { Chip, Stack } from "@mui/material";

export default function HomeChips({ chipOptions }) {
    return (
        <Stack direction="row" spacing={2}>
            {chipOptions.map((option, index) => (
                <Chip
                    key={index}
                    label={option}
                    variant="outlined"
                    sx={{ color: "#84746e" }}
                />
            ))}
        </Stack>
    );
}
