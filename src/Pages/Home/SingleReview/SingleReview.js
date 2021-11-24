import React from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import userIcon from "../../../images/user-icon.png";

const SingleReview = ({ review }) => {
    return (
        <Box>
            <Card sx={{ maxWidth: 345, py: 3, borderRadius: 0, boxShadow: 0 }}>
                <Box>
                    <CardMedia
                        sx={{ width: "100px", mx: "auto" }}
                        component="img"
                        image={userIcon}
                        alt="user photo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {review.name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: "1.1rem", py: 1 }}
                            variant="body2"
                            color="text.secondary"
                        >
                            {review.review}
                        </Typography>
                        <Typography
                            sx={{ fontSize: "1.1rem", py: 1 }}
                            variant="body2"
                            color="text.secondary"
                        >
                            Rating: {review.rating} /5
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default SingleReview;
