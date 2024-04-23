import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import backgroundImage from "../assets/images/services.jpg";
import InnerNavbar from "../components/InnerNavbar";

const MyServices = () => {
    const { id } = useParams();
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServicesByTaskerId = async () => {
            try {
                const { data: serviceData } = await axios.get(
                    `http://localhost:5000/api/taskers/getServiceByTaskerId/${id}`
                );
                setServices(serviceData);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };

        fetchServicesByTaskerId();
    }, [id]);

    const handleEdit = (service) => {
        navigate(`/taskers/myservices/edit/${service._id}`);
    };

    const handleDelete = async (serviceId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/taskers/deleteService/${serviceId}`
            );
            setServices(
                services.filter((service) => service._id !== serviceId)
            );
            toast.success("Service deleted successfully");
        } catch (error) {
            console.error("Failed to delete service:", error);
        }
    };

    return (
        <>
            <InnerNavbar userType="tasker" />
            <Box
                sx={{
                    minHeight: "40vh",
                    display: "flex",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <Typography
                variant="h5"
                fontWeight={600}
                color="teal"
                align="center"
                mt={4}
            >
                My Services
            </Typography>
            {services.length > 0 ? (
                <TableContainer
                    component={Paper}
                    sx={{ margin: 4, maxWidth: "190vh" }}
                >
                    <Table>
                        <TableHead>
                            <TableRow
                                sx={{
                                    background: "#F2F2F2",
                                    "& .MuiTableCell-root": {
                                        fontWeight: 600,
                                        fontSize: 16,
                                    },
                                }}
                            >
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Rate (In Rs)</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service._id}>
                                    <TableCell>{service.name}</TableCell>
                                    <TableCell sx={{ maxWidth: 800 }}>
                                        {service.description}
                                    </TableCell>
                                    <TableCell>{service.rate}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: "green",
                                                mr: 2,
                                                ":hover": {
                                                    background: "#88b9bc",
                                                },
                                            }}
                                            onClick={() => handleEdit(service)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                background: "red",
                                                ":hover": {
                                                    background: "#FF7F7F",
                                                },
                                            }}
                                            onClick={() =>
                                                handleDelete(service._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color="#84746e"
                    align="center"
                    mt={8}
                >
                    No Services Available!
                </Typography>
            )}
            <ToastContainer />
        </>
    );
};

export default MyServices;
