import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Button,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function UpcomingTasks({ tasks, onNavigate }) {
    return (
        <Paper elevation={3} sx={{ padding: 2.5 }}>
            <Typography variant="h6" fontWeight={600} color="teal">
                Upcoming Tasks
            </Typography>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <ListItemIcon>
                            <EventNoteIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={task.title}
                            secondary={task.user}
                        />
                    </ListItem>
                ))}
            </List>
            <Button
                startIcon={<RemoveRedEyeIcon />}
                sx={{
                    marginTop: 1,
                    fontWeight: 600,
                    background: "teal",
                    ":hover": { background: "#88b9bc" },
                }}
                variant="contained"
                onClick={onNavigate}
            >
                View all tasks
            </Button>
        </Paper>
    );
}

export default UpcomingTasks;
