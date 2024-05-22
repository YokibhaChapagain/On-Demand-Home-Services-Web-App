import React, { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Avatar,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InnerNavbar from "../components/InnerNavbar";
import { useAuth } from "../AuthContext";

export default function Review() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const { userId } = useAuth();
    const [taskDetails, setTaskDetails] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/users/getCompletedTaskDetail",
                    {
                        withCredentials: true,
                    }
                );
                setCompletedTasks(data);
                const initialTaskDetails = data.reduce((acc, task) => {
                    acc[task.tasker._id] = { description: "", rating: "" };
                    return acc;
                }, {});
                setTaskDetails(initialTaskDetails);
            } catch (error) {
                console.error("Failed to fetch completed tasks:", error);
            }
        };

        fetchCompletedTasks();
    }, [userId]);

    const handleInputChange = (taskerId, field, value) => {
        setTaskDetails((prevDetails) => ({
            ...prevDetails,
            [taskerId]: {
                ...prevDetails[taskerId],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (taskerId) => {
        const { description, rating } = taskDetails[taskerId];
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/reviews/addreview",
                {
                    description,
                    rating,
                    taskerId,
                },
                {
                    withCredentials: true,
                }
            );
            toast.success(data.message);
            setCompletedTasks((prevTasks) =>
                prevTasks.filter((task) => task.tasker._id !== taskerId)
            );
            setTaskDetails((prevDetails) => {
                const newDetails = { ...prevDetails };
                delete newDetails[taskerId];
                return newDetails;
            });
            setTimeout(() => {
                navigate(`/users/userreviews`);
            }, 1000);
            console.log(data);
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Failed to submit review");
        }
    };
    return (
        <>
            <ToastContainer />
            <InnerNavbar userType="user" />
            <Box sx={{ textAlign: "center", m: 2 }}>
                <Typography variant="h5" fontWeight={600}>
                    Rate and Review Tasker
                </Typography>
            </Box>
            <Container>
                {completedTasks.map((task) => (
                    <Card
                        key={task.tasker._id}
                        sx={{
                            maxWidth: 800,
                            margin: "auto",
                            mt: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: 1,
                            paddingX: 4,
                            boxShadow: 4,
                        }}
                    >
                        <Avatar
                            alt={task.tasker.name}
                            src={`http://localhost:5000/images/${task.tasker.profilePicture}`}
                            sx={{ width: 150, height: 150 }}
                        />
                        <CardContent
                            sx={{ width: "100%", textAlign: "center" }}
                        >
                            <Typography variant="h5">
                                {task.tasker.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                gutterBottom
                            >
                                Service: {task.service.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    gap: 1,
                                }}
                            >
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    value={
                                        taskDetails[task.tasker._id]
                                            ?.description || ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            task.tasker._id,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    label="Rating"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 1, max: 5 }}
                                    fullWidth
                                    value={
                                        taskDetails[task.tasker._id]?.rating ||
                                        ""
                                    }
                                    onChange={(e) =>
                                        handleInputChange(
                                            task.tasker._id,
                                            "rating",
                                            e.target.value
                                        )
                                    }
                                />
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: "teal",
                                        "&:hover": {
                                            backgroundColor: "#b4a49c",
                                        },
                                    }}
                                    onClick={() =>
                                        handleSubmit(task.tasker._id)
                                    }
                                >
                                    Submit Review
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Container>
        </>
    );
}
