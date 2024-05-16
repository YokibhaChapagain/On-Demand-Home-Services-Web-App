import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import axios from "axios";
import InnerNavbar from "../components/InnerNavbar";
import { useAuth } from "../AuthContext";
import UpcomingTaskCard from "../components/UpcomingTaskCard";

export default function TaskDetail() {
    const [tasks, setTasks] = useState([]);
    const { userId } = useAuth();
    useEffect(() => {
        const fetchUpcomingTasks = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/taskers/upcoming-tasks",
                    {
                        withCredentials: true,
                    }
                );
                setTasks(
                    data.map((task) => ({
                        id: task._id,
                        title: `${task.serviceId.name} in ${task.userId.address}`,
                        user: task.userId.name,
                        address: task.userId.address,
                        number: task.userId.number,
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch upcoming tasks:", error);
                setTasks([]);
            }
        };

        if (userId) {
            fetchUpcomingTasks();
        }
    }, [userId]);
    return (
        <>
            <InnerNavbar userType="tasker" />
            <Container>
                <Typography variant="h4" gutterBottom>
                    All Upcoming Tasks
                </Typography>
                <UpcomingTaskCard tasks={tasks} />
            </Container>
        </>
    );
}
