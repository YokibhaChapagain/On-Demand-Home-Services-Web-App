import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Avatar,
    Button,
    Stack,
    Typography,
    Card,
    CardContent,
    Box,
    Container,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import CardMedia from "@mui/material/CardMedia";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InnerNavbar from "../components/InnerNavbar";

export default function TaskerProfile() {
    const { id } = useParams();
    const [tasker, setTasker] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskerDetails = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/taskers/getTaskerById/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                setTasker(data);
            } catch (error) {
                console.error("Failed to fetch tasker details:", error);
            }
        };

        fetchTaskerDetails();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/taskers/taskerprofile/edit/${id}`, { state: { tasker } });
    };

    if (!tasker) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <InnerNavbar userType="tasker" />

            <Container maxWidth="md" sx={{ marginTop: 4 }}>
                <Card raised sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 4,
                            }}
                        >
                            <Avatar
                                src={`http://localhost:5000/images/${tasker.profilePicture}`}
                                sx={{ width: 150, height: 150, mr: 2 }}
                                alt={tasker.name}
                            />
                            <Typography variant="h4">{tasker.name}</Typography>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <EmailIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {tasker.email}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocalPhoneIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {tasker.number}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOnIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {tasker.area}
                            </Typography>
                        </Stack>

                        <Card
                            sx={{
                                borderRadius: "4",
                                background: "#F2F2F2",
                                p: 2,
                                my: 2,
                            }}
                        >
                            <Typography
                                variant="body1"
                                paragraph
                                fontWeight={600}
                            >
                                About Me
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {tasker.description}
                            </Typography>
                        </Card>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CircleIcon
                                fontSize="small"
                                sx={{
                                    color: tasker.availability
                                        ? "green"
                                        : "red",
                                }}
                            />
                            <Typography>
                                {tasker.availability
                                    ? "Available"
                                    : "Unavailable"}
                            </Typography>
                        </Stack>
                        <CardMedia
                            component="img"
                            image={`http://localhost:5000/images/${tasker.citizenship}`}
                            alt="citizenship"
                            sx={{ width: "100%", mt: 2 }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                background: "teal",
                                ":hover": {
                                    background: "#88b9bc",
                                },
                            }}
                            fullWidth
                            onClick={handleEditClick}
                        >
                            Edit Profile
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
