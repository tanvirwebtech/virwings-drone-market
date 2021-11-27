import { Box, Typography } from "@mui/material";
import React from "react";

const SingleFeaturedProduct = ({ product }) => {
    const { modelName, img, price } = product;
    return (
        <div style={{ marginTop: "2rem" }}>
            <Box sx={{ position: "relative", border: 1, mx: 1 }}>
                <img src={img} alt={modelName} style={{ width: "100%" }} />
                <Box
                    sx={{
                        position: "absolute",
                        zIndex: "4548",
                        bottom: 0,
                        px: 3,
                        left: "50%",
                        backgroundColor: "#ffffff90",
                        transform: "translateX(-50%)",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "600" }}>
                        {modelName}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "600" }}>
                        ${price}
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default SingleFeaturedProduct;
