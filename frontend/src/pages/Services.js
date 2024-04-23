import React from "react";
import LandingNavbar from "../components/LandingNavbar";
import { Box } from "@mui/material";
import backgroundImage from "../assets/images/services.jpg";
import ServicesDescription from "../components/ServicesDescription";
import FooterDesign from "../components/FooterDesign";

export default function Services() {
    return (
        <>
            <LandingNavbar />
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
            <ServicesDescription />
            <FooterDesign />
        </>
    );
}
