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

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InnerNavbar from "../components/InnerNavbar";

export default function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/users/getUserById/${id}`,
                    {
                        withCredentials: true,
                    }
                );
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/users/userprofile/edit/${id}`);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <InnerNavbar userType="user" />
            <Container maxWidth="md" sx={{ marginTop: 12 }}>
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
                                src={`http://localhost:5000/images/${user.profilePicture}`}
                                sx={{ width: 150, height: 150, mr: 2 }}
                                alt={user.name}
                            />
                            <Typography variant="h4">{user.name}</Typography>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <EmailIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {user.email}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocalPhoneIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {user.number}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOnIcon sx={{ color: "#dbccbe" }} />
                            <Typography variant="body2">
                                {user.address}
                            </Typography>
                        </Stack>

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
