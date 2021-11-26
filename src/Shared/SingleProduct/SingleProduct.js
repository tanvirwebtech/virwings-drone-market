import {
  Button,
  Card,
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
  const { link } = useStyle();
  return (
    <Grid item md={3} sm={6} xs={12} sx={{ display: "flex" }}>
      <Card
        sx={{
          background: "#ffffff30",
          border: 1,
          backdropFilter: "blur(10px)",
          borderRadius: 0,
          boxShadow: 0,
          py: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <Box sx={{ width: "100%", mx: "auto" }}>
            <CardMedia
              component="img"
              image={img}
              alt="DJI DRONE"
              className="card-img"
              sx={{ width: 1 }}
            />
          </Box>
          <CardContent style={{ paddingBottom: 0 }}>
            <Typography gutterBottom variant="h5">
              {modelName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc.slice(0, 80) + "..."}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              ${price} / <strike>{oldPrice}</strike>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Link to={`/purchase-product/${_id}`} className={link}>
            <Button
              sx={{ mx: "auto", px: 1, color: "#fff" }}
              variant="contained"
            >
              Buy Now
            </Button>
          </Link>
        </Box>
      </Card>
    </Grid>
  );
};

export default SingleProduct;
