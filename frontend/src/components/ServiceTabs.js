import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import FenceOutlinedIcon from "@mui/icons-material/FenceOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import ImagesearchRollerOutlinedIcon from "@mui/icons-material/ImagesearchRollerOutlined";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

export default function ServiceTabs({ value, handleChange }) {
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs
                value={value}
                onChange={(e, newValue) => handleChange(newValue)}
                centered
            >
                <Tab icon={<PlumbingIcon />} label="Plumbing" value="0" />
                <Tab icon={<CleaningServicesIcon />} label="Cleaning" />
                <Tab
                    icon={<EventSeatOutlinedIcon />}
                    label="Furniture Assembly"
                />
                <Tab icon={<FenceOutlinedIcon />} label="Yard Work" />
                <Tab icon={<AirportShuttleOutlinedIcon />} label="Moving" />
                <Tab
                    icon={<ImagesearchRollerOutlinedIcon />}
                    label="Painting"
                ></Tab>
                <Tab icon={<OtherHousesIcon />} label="Household"></Tab>
            </Tabs>
        </Box>
    );
}
