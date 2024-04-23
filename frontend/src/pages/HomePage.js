import {
    Typography,
    Stack,
    Container,
    TextField,
    InputAdornment,
    Autocomplete,
} from "@mui/material";

import { React, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LandingNavbar from "../components/LandingNavbar";
import ServiceTabs from "../components/ServiceTabs";
import HomeChips from "../components/HomeChips";
import HomeCards from "../components/HomeCards";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [selectedTab, setSelectedTab] = useState(0);

    const [chipOptions, setChipOptions] = useState([]);
    const taskoption = [
        "Plumbing",
        "Assembly",
        "Cleaning",
        "Electrical Work",
        "Painting",
        "Household",
    ];
    const options = [
        [
            "Install Faucet",
            "Fix Leaks",
            "Unclog Drains",
            "Water Heater Installation",
            "Pipe Repair",
            "Gas Line Installation",
        ],
        [
            "Vacuuming",
            "Dusting",
            "Mopping",
            "Window Cleaning",
            "Carpet Cleaning",
            "Deep Cleaning",
        ],
        [
            "Crib Assembly",
            "Disassemble Furniture",
            "IKEA Furniture Assembly",
            "Office Furniture Assembly",
            "Bed Assembly",
            "Bookshelf Assembly",
        ],
        [
            "Yard Clean-up",
            "Lawn Mowing",
            "Hedge Trimming",
            "Leaf Removal",
            "Gardening",
            "Tree Trimming",
        ],
        [
            "House Moving",
            "Apartment Moving",
            "Office Moving",
            "Furniture Moving",
            "Packing Services",
            "Storage Services",
        ],
        [
            "Interior Painting",
            "Exterior Painting",
            "House Painting",
            "Commercial Painting",
            "Wall Painting",
            "Ceiling Painting",
        ],
        [
            "Cleaning services",
            "Laundry and Ironing",
            "Kitchen Maintenance",
            "Meal Preperation",
            "Bedding and Linens",
            "Miscellaneous Tasks",
        ],
    ];

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
        setChipOptions(options[newValue]);
    };
    const navigate = useNavigate();
    const handleAutoCompleteChange = (newValue) => {
        if (newValue) {
            navigate("/services");
        }
    };

    return (
        <>
            <LandingNavbar />
            <Container sx={{ marginTop: 16 }}>
                <Stack alignItems="center" spacing={2} marginBottom={4}>
                    <Typography variant="h3" fontWeight={600} color="#84746e">
                        Book Your Service
                    </Typography>
                    <Autocomplete
                        fullWidth
                        options={taskoption}
                        onChange={handleAutoCompleteChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="What do you need help with?"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon
                                                sx={{ color: "#84746e" }}
                                            />
                                        </InputAdornment>
                                    ),
                                    style: {
                                        borderRadius: 20,
                                    },
                                }}
                            />
                        )}
                    />
                    <ServiceTabs
                        value={selectedTab}
                        handleChange={handleTabChange}
                    />
                    {selectedTab !== null && (
                        <>
                            <HomeChips chipOptions={chipOptions} />
                        </>
                    )}
                </Stack>
                <Typography
                    variant="h5"
                    fontWeight={600}
                    color="#84746e"
                    marginBottom={2}
                >
                    Popular Projects
                </Typography>
                <HomeCards />
            </Container>
        </>
    );
}
