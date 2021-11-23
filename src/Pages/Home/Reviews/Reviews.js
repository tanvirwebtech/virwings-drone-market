import { Container, Typography, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import SingleReview from "../SingleReview/SingleReview";
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);
    const getSlideNum = (n) => {
        if (n < 3) {
            return n;
        }
        if (n >= 3) {
            return 3;
        }
    };
    const settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: getSlideNum(reviews.length),
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
            <Container sx={{ py: 4, mt: 6 }}>
                <Typography variant="h3" sx={{ my: 2 }}>
                    What people says about us?
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <SingleReview
                            key={review._id}
                            review={review}
                        ></SingleReview>
                    ))}
                </Slider>
            </Container>
        </div>
    );
};

export default Reviews;
