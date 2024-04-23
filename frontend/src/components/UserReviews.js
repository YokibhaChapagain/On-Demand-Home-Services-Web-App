import React from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Rating,
    Paper,
    Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function UserReviews({ reviews, onNavigate }) {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: 1.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant="h6"
                sx={{ marginBottom: 2 }}
                fontWeight={600}
                color="teal"
            >
                User Reviews
            </Typography>
            <List sx={{ width: "100%" }}>
                {reviews.map((review) => (
                    <ListItem key={review.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt={review.name}
                                src={review.imgSrc}
                                sx={{ width: 50, height: 50 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={review.name}
                            secondary={
                                <>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {review.comment}
                                    </Typography>
                                    <Rating
                                        name="read-only"
                                        value={review.rating}
                                        readOnly
                                        size="small"
                                    />
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
            <Button
                startIcon={<RemoveRedEyeIcon />}
                sx={{
                    marginTop: 1,
                    fontWeight: 600,
                    background: "teal",
                    ":hover": { background: "#88b9bc" },
                }}
                variant="contained"
                onClick={onNavigate}
            >
                View all reviews
            </Button>
        </Paper>
    );
}

export default UserReviews;
