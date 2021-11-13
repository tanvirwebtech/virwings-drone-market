import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import SingleProduct from "../../Shared/SingleProduct/SingleProduct";
import HomeBanner from "./HomeBanner/HomeBanner";
import Reviews from "./Reviews/Reviews";

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/all-products")
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data);
            });
    }, []);
    const slicedProducts = allProducts.slice(0, 6);
    return (
        <>
            <div>
                <Header />
                <HomeBanner />
                <div style={{ backgroundColor: "#00000050" }}>
                    <Container sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ py: 2 }}>
                            Our Best Performing Products
                        </Typography>
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            {slicedProducts.map((product) => (
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    </Container>
                </div>
                <Reviews />
            </div>
            <Footer />
        </>
    );
};

export default Home;
