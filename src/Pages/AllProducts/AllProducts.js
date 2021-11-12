import { Category } from "@mui/icons-material";
import { Container, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../../Shared/SingleProduct/SingleProduct";
import Header from "../../Shared/Header/Header";
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/all-products")
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data);
            });
    }, []);

    const getDronesByCategory = (category) => {
        const dronesByCategory = allProducts.filter(
            (product) => product.category === category
        );
        return dronesByCategory;
    };

    const cinematicDrones = getDronesByCategory("cinematic");
    const professionalDrones = getDronesByCategory("professional");
    const surveillenceDrones = getDronesByCategory("surviellence");
    return (
        <>
            <Header></Header>
            <div style={{ backgroundColor: "#00000050" }}>
                <Container sx={{ pb: 4, pt: 20 }}>
                    <Typography variant="h2" sx={{ py: 2 }}>
                        All Your desired product is here
                    </Typography>
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        All Drones
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {allProducts.map((product) => (
                            <SingleProduct
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Grid>
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Cinematic
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {cinematicDrones.map((product) => (
                            <SingleProduct
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Grid>
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Professional
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {professionalDrones.map((product) => (
                            <SingleProduct
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Grid>
                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Surviellence
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        {surveillenceDrones.map((product) => (
                            <SingleProduct
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default AllProducts;
