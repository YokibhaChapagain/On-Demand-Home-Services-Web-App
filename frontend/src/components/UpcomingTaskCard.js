import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

export default function UpcomingTaskCard({ tasks }) {
    return (
        <Grid container spacing={2}>
            {tasks.map((task) => (
                <Grid item xs={12} md={6} lg={4} key={task.id}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography
                                variant="h6"
                                color="teal"
                                display="flex"
                                alignItems="center"
                            >
                                <EventNoteIcon style={{ marginRight: 8 }} />
                                {task.title}
                            </Typography>
                            <Typography variant="body2">
                                User: {task.user}
                            </Typography>
                            <Typography variant="body2">
                                Address: {task.address}
                            </Typography>
                            <Typography variant="body2">
                                Number: {task.number}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
