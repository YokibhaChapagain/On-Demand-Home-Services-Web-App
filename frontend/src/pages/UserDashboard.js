import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Stack,
    Button,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Grid,
    Container,
    TextField,
    InputAdornment,
    Box,
    Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ChaletIcon from "@mui/icons-material/Chalet";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useCookies } from "react-cookie";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import FooterDesign from "../components/FooterDesign";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth } from "../AuthContext";

const taskoption = [
    "Plumbing",
    "Assembly",
    "Cleaning",
    "Electrical Work",
    "Painting",
    "Household",
];
export default function UserDashboard() {
    const [cookies, removeCookie] = useCookies();
    console.log(cookies);
    const { userId, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/users/logout", null, {
                withCredentials: true,
            });
            removeCookie("token");
            logout();
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    const [taskers, setTaskers] = useState([]);
    const [user, setUser] = useState([]);
    const [showAllTaskers, setShowAllTaskers] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/getUserById/${userId}`
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchTaskers = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/taskers/getTaskers`,
                    {
                        withCredentials: true,
                    }
                );
                setTaskers(data);
            } catch (error) {
                console.error("Failed to fetch taskers");
            }
        };
        fetchTaskers();
    }, []);

    const navigate = useNavigate();
    const handleAutoCompleteChange = (newValue) => {
        if (newValue) {
            navigate("/users/booktask");
        }
    };
    const handleSeeMoreClick = () => {
        setShowAllTaskers(true);
    };

    const handleViewTaskerProfile = (id) => {
        navigate(`/users/taskerprofile/${id}`);
    };
    const TaskerCard = ({ tasker }) => (
        <Card sx={{ maxWidth: 345, m: 1, p: 2, borderRadius: 6, boxShadow: 4 }}>
            <CardContent>
                <Avatar
                    alt={tasker.name}
                    src={`http://localhost:5000/images/${tasker.profilePicture}`}
                    sx={{
                        width: 145,
                        height: 145,
                        mx: "auto",
                        mb: 2,
                    }}
                />
                <Typography
                    gutterBottom
                    variant="h5"
                    align="center"
                    fontWeight={700}
                    color="teal"
                >
                    {tasker.name}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon sx={{ color: "#dbccbe" }} />
                    <Typography variant="body2">{tasker.email}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocalPhoneIcon sx={{ color: "#dbccbe" }} />
                    <Typography variant="body2">{tasker.number}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon sx={{ color: "#dbccbe" }} />
                    <Typography variant="body2">{tasker.area}</Typography>
                </Stack>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                    }}
                >
                    <CircleIcon
                        sx={{
                            color: tasker.availability ? "green" : "red",
                        }}
                    />
                    <Typography variant="subtitle1" sx={{ ml: 0.5 }}>
                        {tasker.availability ? "Available" : "Unavailable"}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    sx={{
                        borderColor: "#dbccbe",
                        borderRadius: 4,
                        fontWeight: 600,
                        p: 1,
                        background: "linear-gradient(145deg, #dcd0c0, #ebe6e1)",
                        color: "black",
                        "&:hover": {
                            background:
                                "linear-gradient(145deg, #ebe6e1, #dcd0c0)",
                        },
                    }}
                    onClick={() => handleViewTaskerProfile(tasker._id)}
                >
                    View Tasker Profile
                </Button>
            </CardActions>
        </Card>
    );
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
                            href="/users/booktask"
                        >
                            Book a Task
                        </Button>
                        <Button
                            variant="inherit"
                            onClick={() => navigate("/users/review")}
                        >
                            Review
                        </Button>
                        <Button
                            variant="inherit"
                            onClick={() =>
                                navigate(`/users/userprofile/${userId}`)
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

            <Container sx={{ marginTop: 6 }}>
                <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems={"center"}
                    mb={4}
                >
                    <Avatar
                        src={`http://localhost:5000/images/${user.profilePicture}`}
                        sx={{
                            width: 100,
                            height: 100,
                        }}
                    ></Avatar>
                    <Typography variant="h4">
                        Welcome,{" "}
                        <Typography
                            variant="h4"
                            fontWeight={600}
                            color="teal"
                            display={"inline"}
                        >
                            {user.name}
                        </Typography>
                    </Typography>
                </Stack>

                <Autocomplete
                    fullWidth
                    options={taskoption}
                    onChange={handleAutoCompleteChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Describe a task you want"
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

                <Grid container spacing={2} marginTop={4}>
                    {taskers
                        .slice(0, showAllTaskers ? taskers.length : 3)
                        .map((tasker) => (
                            <Grid item key={tasker._id} xs={12} sm={6} md={4}>
                                <TaskerCard tasker={tasker} />
                            </Grid>
                        ))}
                </Grid>
            </Container>
            {!showAllTaskers && (
                <Box
                    sx={{
                        mt: 4,

                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        onClick={handleSeeMoreClick}
                        variant="contained"
                        sx={{
                            fontWeight: 600,
                            background: "teal",
                            color: "white",
                            ":hover": {
                                background: "#88b9bc",
                            },
                        }}
                    >
                        See More
                    </Button>
                </Box>
            )}
            <Box sx={{ mt: 8, py: 2 }}>
                <FooterDesign />
            </Box>
        </>
    );
}
