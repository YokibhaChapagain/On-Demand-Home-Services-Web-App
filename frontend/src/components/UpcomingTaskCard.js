import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Switch,
    Button,
    FormControlLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import EventNoteIcon from "@mui/icons-material/EventNote";
import axios from "axios";

export default function UpcomingTaskCard({ tasks }) {
    const [taskStatuses, setTaskStatuses] = useState({});

    useEffect(() => {
        setTaskStatuses(
            tasks.reduce(
                (acc, task) => ({ ...acc, [task.id]: task.taskCompleted }),
                {}
            )
        );
    }, [tasks]);

    const handleStatusChange = (taskId) => {
        setTaskStatuses((prevStatuses) => ({
            ...prevStatuses,
            [taskId]: !prevStatuses[taskId],
        }));
    };

    const handleSubmit = async (task) => {
        try {
            await axios.put(
                "http://localhost:5000/api/taskers/update-task-status",
                {
                    taskerId: task.taskerId,
                    userId: task.userId,
                    serviceId: task.serviceId,
                    taskCompleted: taskStatuses[task.id],
                },
                {
                    withCredentials: true,
                }
            );
            toast.success("Task status updated successfully!");
        } catch (error) {
            toast.error("Failed to update task status.");
        }
    };
    return (
        <>
            <ToastContainer />
            <Grid container spacing={2}>
                {tasks.map((task) => (
                    <Grid item xs={12} md={6} lg={6} key={task.id}>
                        <Card variant="outlined" sx={{ minWidth: 300 }}>
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={taskStatuses[task.id]}
                                            onChange={() =>
                                                handleStatusChange(task.id)
                                            }
                                            name="taskStatus"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        taskStatuses[task.id]
                                            ? "Completed"
                                            : "Pending"
                                    }
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSubmit(task)}
                                    sx={{ mt: 2, background: "teal" }}
                                >
                                    Submit
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}
