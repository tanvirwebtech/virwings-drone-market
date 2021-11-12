import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";

const useStyle = makeStyles({
    link: {
        textDecoration: "none",
    },
    flexCenter: {
        justifyContent: "center",
    },
});
const SingleProduct = ({ product }) => {
    const { modelName, img, price, oldPrice, desc, _id } = product;
    const { link, flexCenter } = useStyle();
    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card
                sx={{
                    background: "#ffffff30",
                    border: 1,
                    backdropFilter: "blur(10px)",
                    borderRadius: 0,
                    boxShadow: 0,
                    py: 2,
                }}
            >
                <CardActionArea sx={{}}>
                    <Box sx={{ width: "100%", mx: "auto" }}>
                        <CardMedia
                            component="img"
                            image={img}
                            alt="DJI DRONE"
                            className="card-img"
                            sx={{ width: 1 }}
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {modelName}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "1.2rem" }}
                        >
                            {desc.slice(0, 80) + "..."}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            ${price} / <strike>{oldPrice}</strike>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={flexCenter}>
                    <Link to={`/purchase-product/${_id}`} className={link}>
                        <Button
                            sx={{ mx: "auto", px: 3, border: 1 }}
                            color="secondary"
                        >
                            Buy Now
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default SingleProduct;
