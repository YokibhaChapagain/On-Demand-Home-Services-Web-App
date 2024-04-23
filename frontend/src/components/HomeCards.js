import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Furniture from "../assets/images/HomePage/furnitureAssem.jpeg";
import MountShelves from "../assets/images/HomePage/MountShelves.jpg";
import Electrical from "../assets/images/HomePage/electricalhelp.jpg";
import Moving from "../assets/images/HomePage/helpMoving.jpg";
import Lifting from "../assets/images/HomePage/heavylifting.jpg";
import Cleaning from "../assets/images/HomePage/cleaningg.jpg";
import Plumbing from "../assets/images/HomePage/plumbingrepair.jpg";
import yard from "../assets/images/HomePage/yardwork.jpeg";

const cardData = [
    {
        image: Furniture,
        title: "Furniture Assembly",
        description: "Projects starting at Rs 500",
    },
    {
        image: MountShelves,
        title: "Mount Shelves",
        description: "Projects starting at Rs 800",
    },
    {
        image: Electrical,
        title: "Electrical Help",
        description: "Projects starting at Rs 400",
    },
    {
        image: Moving,
        title: "Help Moving",
        description: "Projects starting at Rs 600",
    },
    {
        image: Lifting,
        title: "Heavy Lifting",
        description: "Projects starting at Rs 500",
    },
    {
        image: Cleaning,
        title: "Cleaning",
        description: "Projects starting at Rs 300",
    },
    {
        image: Plumbing,
        title: "Minor Plumbing Repairs",
        description: "Projects starting at Rs 900",
    },
    {
        image: yard,
        title: "Yard Work",
        description: "Projects starting at Rs 700",
    },
];

export default function HomeCards() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <Slider {...settings}>
            {cardData.map((card, index) => (
                <div key={index}>
                    <Card
                        sx={{ borderRadius: 4, background: "#f7f4f3", mx: 2 }}
                    >
                        <CardMedia
                            sx={{ height: 140 }}
                            image={card.image}
                            title={card.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Slider>
    );
}
