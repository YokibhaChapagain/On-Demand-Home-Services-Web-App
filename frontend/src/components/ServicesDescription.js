import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import Cleaning from "../assets/images/cleaning.png";
import Plumbing from "../assets/images/plumbing.jpg";
import FurnitureAssembly from "../assets/images/furniture.jpg";
import YardWork from "../assets/images/yardwork.jpg";
import Moving from "../assets/images/moving.jpg";
import Painting from "../assets/images/painting.jpeg";
import Household from "../assets/images/household.jpg";

const servicesData = [
    {
        title: "Plumbing",
        description1:
            "Plumbing services encompass a wide range of tasks vital for maintaining a functional home. From fixing leaks and repairing broken pipes to installing new fixtures and handling drainage issues, plumbers ensure the smooth operation of your water and sewage systems.",
        description2:
            "Additionally, we offer services like water heater installation and repair, sewer line cleaning, and toilet and sink replacement. Prices for plumbing services can vary depending on the complexity of the job.",
        rate: " Minor repairs might range from Rs 100 to Rs 250, while larger projects like pipe replacements or sewer line repairs could cost anywhere from Rs 500 to Rs 2,000 or more.",
        image: Plumbing,
    },
    {
        title: "Cleaning",
        description1:
            "Cleaning services provide essential maintenance to keep homes and businesses clean and sanitary. This includes regular cleaning tasks such as vacuuming, mopping, dusting, and sanitizing surfaces in living spaces, kitchens, bathrooms, and common areas",
        description2:
            "Deep cleaning services may involve tasks like carpet cleaning, upholstery cleaning, window washing, and thorough scrubbing of hard-to-reach areas. Prices for cleaning services typically depend on factors such as the size of the space, the frequency of cleaning, and any additional services requested",
        rate: "Weekly or bi-weekly cleaning services might range from Rs 300 to Rs 500 per visit, while one-time deep cleaning services could cost Rs 1000 to Rs 5000 or more",
        image: Cleaning,
    },
    {
        title: "Furniture Assembly",
        description1:
            "Furniture assembly services offer convenience and peace of mind for those who prefer not to tackle the often-frustrating task of assembling furniture themselves. Whether it's a new sofa, bed frame, dining table, or office desk, professional assemblers can quickly and correctly put together flat-pack furniture from retailers like Daraz, HamroBazar, or Sasto Deals",
        description2:
            "Additionally, we can disassemble and reassemble furniture for relocation or storage purposes. Prices for furniture assembly services typically depend on the complexity and quantity of items to be assembled. ",
        rate: "Assembly of basic items like chairs or small tables might start at Rs 500 to Rs 1000, while larger and more intricate pieces could range from Rs 6000 to Rs 13000 or more",
        image: FurnitureAssembly,
    },
    {
        title: "Yard Work",
        description1:
            "Yard work services encompass a variety of outdoor maintenance tasks aimed at keeping your property looking its best. This includes lawn mowing, edging, and trimming, as well as leaf and debris removal, hedge trimming, and garden bed maintenance",
        description2:
            "Professional yard workers can also provide services such as fertilizing, aerating, and seeding to promote healthy grass growth and overall landscape health. Prices for yard work services can vary based on factors like the size of the yard, the complexity of the tasks, and the frequency of service",
        rate: "Basic lawn care packages might range from Rs 500 to Rs 800 per visit, while comprehensive landscaping services could cost Rs 1000 to Rs 5000 or more",
        image: YardWork,
    },
    {
        title: "Moving",
        description1:
            "Moving services offer assistance with the labor-intensive process of relocating belongings from one location to another. Whether it's a local move within the same city or a long-distance move across state lines, professional movers can handle packing, loading, transportation, unloading, and unpacking of household or office items. ",
        description2:
            "We also provide services such as furniture disassembly and reassembly, appliance disconnect and reconnect, and specialty item handling for fragile or valuable possessions. Prices for moving services are typically based on factors like the distance of the move, the size of the home or office, the number of movers required, and any additional services requested",
        rate: "Local moves might start at Rs 300 to Rs 500 for basic services, while long-distance moves could range from Rs 2,000 to Rs 15,000 or more depending on distance and services included",
        image: Moving,
    },
    {
        title: "Painting",
        description1:
            "Painting services revitalize interior and exterior spaces by applying fresh coats of paint to walls, ceilings, trim, and other surfaces. Whether it's a single room, an entire house, or a commercial property, professional painters can handle prep work like patching holes, sanding surfaces, and priming, as well as the actual painting process.",
        description2:
            "We provide expertise in color selection, paint type recommendations, and achieving smooth, even finishes for a professional-looking result. Prices for painting services vary depending on factors such as the size of the project, the type of surfaces to be painted, the number of coats required, and any additional services like trim painting or wallpaper removal",
        rate: " Interior painting projects might range from Rs 3000 to Rs 5000 or more, while exterior painting could cost Rs 10000 to Rs 20000 depending on the size and condition of the property",

        image: Painting,
    },
    {
        title: "Household",
        description1:
            "Household services encompass a broad range of tasks essential for maintaining a comfortable and functional home environment. This includes services like handyman repairs, electrical work, HVAC maintenance, pest control, and home organization",
        description2:
            ". Professional household service providers offer expertise in a variety of areas to address the diverse needs of homeowners, from fixing leaky faucets and repairing electrical outlets to installing smart home devices and organizing cluttered spaces. Prices for household services can vary widely depending on the nature and complexity of the task, as well as factors such as materials, equipment, and labor required",
        rate: "Handyman services might start at Rs 1000 to Rs 3000 per hour, while more specialized services could range from Rs 8000 to Rs 16000 or more depending on the scope of work.",
        image: Household,
    },
];

export default function ServicesDescription() {
    return (
        <Grid container spacing={2} padding={12}>
            {servicesData.map((service, index) => (
                <Grid key={index} item xs={12}>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        gutterBottom
                        color="#84746e"
                    >
                        {service.title}
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={7}>
                            <Card sx={{ borderRadius: 2, marginBottom: 4 }}>
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        marginBottom={2}
                                    >
                                        {service.description1}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        marginBottom={2}
                                    >
                                        {service.description2}
                                    </Typography>
                                    <Typography variant="body1">
                                        {service.rate}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <CardMedia
                                sx={{ height: 300, borderRadius: 2 }}
                                image={service.image}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}
