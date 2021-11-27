import { TrendingUpTwoTone } from "@mui/icons-material";
import { Container, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleFeaturedProduct from "./SingleFeaturedProduct/SingleFeaturedProduct";

const Featured = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/all-products")
            .then((res) => res.json())
            .then((data) => {
                const slicedData = data.slice(0, 6);
                setFeaturedProducts(slicedData);
            });
    }, []);
    console.log(featuredProducts);
    const settings = {
        dots: true,
        arrows: true,
        autoplay: false,
        // autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
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
        <div>
            <Container sx={{ py: 7 }}>
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body1" color="primary">
                        This week's
                    </Typography>
                    <Typography variant="h3">
                        Featured Drones for sells
                    </Typography>
                </Box>
                <Box>
                    <Slider {...settings}>
                        {featuredProducts.map((product) => (
                            <SingleFeaturedProduct
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Slider>
                </Box>
            </Container>
        </div>
    );
};

export default Featured;
