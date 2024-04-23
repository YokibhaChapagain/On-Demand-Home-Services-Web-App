import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Stack,
    Button,
    Grid,
    IconButton,
    Avatar,
    Container,
    TextField,
    InputAdornment,
    Autocomplete,
} from "@mui/material";
import ChaletIcon from "@mui/icons-material/Chalet";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import userreview1 from "../assets/images/userreview1.jpg";
import userreview2 from "../assets/images/userreview2.jpg";
import userreview3 from "../assets/images/usererview3.jpg";
import SearchIcon from "@mui/icons-material/Search";
import UpcomingTasks from "../components/UpcomingTasks";
import MonthlyRevenue from "../components/MontlyRevenue";
import UserReviews from "../components/UserReviews";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function TaskerDashboard() {
    const [cookies, removeCookie] = useCookies();
    console.log(cookies);
    const { userId, logout } = useAuth();

    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const [tasker, setTasker] = useState([]);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/taskers/logout", null, {
                withCredentials: true,
            });
            removeCookie("token");
            logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    useEffect(() => {
        const fetchTasker = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/taskers/getTaskerById/${userId}`
                );
                setTasker(response.data);
            } catch (error) {
                console.error("Error fetching tasker data:", error);
            }
        };
        fetchTasker();
    }, [userId]);

    useEffect(() => {
        const fetchServicesByTaskerId = async () => {
            try {
                const { data: serviceData } = await axios.get(
                    `http://localhost:5000/api/taskers/getServiceByTaskerId/${userId}`
                );
                setServices(Array.isArray(serviceData) ? serviceData : []);
            } catch (error) {
                console.error("Failed to fetch services:", error);
                setServices([]);
            }
        };

        fetchServicesByTaskerId();
    }, [userId]);

    const handleViewMyServices = () => {
        navigate(`/taskers/myservices/${userId}`);
    };
    const upcomingTasks = [
        { id: 1, title: "Plumbing in City Center", user: "Ramita K.c" },
        {
            id: 2,
            title: "Electric Repair in Riverside",
            user: "Sharukh Upreti",
        },
        { id: 3, title: "Plumbing in City Center", user: "Keshav Aryal" },
        {
            id: 4,
            title: "Electric Repair in Riverside",
            user: " Riya Shah",
        },
    ];
    const reviews = [
        {
            id: 1,
            name: "Alice Koirala",
            rating: 4,
            comment: "Very professional and timely service!",
            imgSrc: userreview1,
        },
        {
            id: 2,
            name: "Bob Thapa",
            rating: 5,
            comment: "Outstanding work! Highly recommend.",
            imgSrc: userreview3,
        },
        {
            id: 3,
            name: "Seyara Shah",
            rating: 3,
            comment: "Good service but could be faster.",
            imgSrc: userreview2,
        },
    ];

    const chartData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Monthly Revenue (Rs)",
                data: [20300, 18400, 22300, 24500, 25600, 25300],
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Revenue by Month",
            },
        },
    };

    const handleAutoCompleteChange = (newValue) => {
        if (newValue) {
            navigate(`/taskers/myservices/${userId}`);
        }
    };
    return (
        <>
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
                        <Button
                            variant="contained"
                            sx={{
                                background: "#dbccbe",
                                color: "black",
                                "&:hover": {
                                    backgroundColor: "#b4a49c",
                                },
                            }}
                            href="/taskers/addservice"
                        >
                            Add Service
                        </Button>
                        <Button
                            variant="inherit"
                            onClick={handleViewMyServices}
                        >
                            My Services
                        </Button>
                        <Button
                            variant="inherit"
                            onClick={() =>
                                navigate(`/taskers/taskerprofile/${userId}`)
                            }
                        >
                            Profile
                        </Button>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Stack direction={"row"} spacing={2} alignItems={"center"} m={4}>
                <Avatar
                    src={`http://localhost:5000/images/${tasker.profilePicture}`}
                    sx={{
                        width: 100,
                        height: 100,
                    }}
                ></Avatar>
                <Typography variant="h4">
                    Welcome,
                    <Typography
                        variant="h4"
                        fontWeight={600}
                        color="teal"
                        display={"inline"}
                    >
                        {tasker.name}
                    </Typography>
                </Typography>
            </Stack>
            <Container sx={{ mb: 4 }}>
                <Autocomplete
                    fullWidth
                    options={services.map((service) => service.name)}
                    onChange={handleAutoCompleteChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search your Services"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: "#84746e" }} />
                                    </InputAdornment>
                                ),
                                style: {
                                    borderRadius: 20,
                                },
                            }}
                        />
                    )}
                />
            </Container>
            <Grid container spacing={2} sx={{ padding: 3 }}>
                <Grid item xs={12} sm={4}>
                    <UpcomingTasks
                        tasks={upcomingTasks}
                        onNavigate={() => navigate("/taskers/addtask")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <MonthlyRevenue
                        data={chartData}
                        options={chartOptions}
                        onNavigate={() => navigate("/taskers/revenue")}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <UserReviews
                        reviews={reviews}
                        onNavigate={() => navigate("/taskers/reviews")}
                    />
                </Grid>
            </Grid>
        </>
    );
}
