import {
    CircularProgress,
    Container,
    Divider,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleProduct from "../../Shared/SingleProduct/SingleProduct";
import Header from "../../Shared/Header/Header";
import Footer from "../../Shared/Footer/Footer";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Animate from "animate.css-react";
import "animate.css/animate.css";
const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/all-products")
            .then((res) => res.json())
            .then((data) => {
                setAllProducts(data);
            });
    }, []);

    let { path, url } = useRouteMatch();

    const getDronesByCategory = (category) => {
        const dronesByCategory = allProducts.filter(
            (product) => product.category === category
        );
        return dronesByCategory;
    };

    const cinematicDrones = getDronesByCategory("cinematic");
    const professionalDrones = getDronesByCategory("professional");
    const surveillenceDrones = getDronesByCategory("surviellence");

    const useStyles = makeStyles({
        category: {
            padding: "0.5rem 1.3rem",
            border: 0,
            margin: "0 0.3rem",
            borderRadius: "10px",
            backgroundColor: "#ffffff77",
            transition: "0.3s all",
            "&:hover": {
                cursor: "pointer",
                color: "#fff",
                backgroundColor: "#00000077",
            },
        },
    });
    const { category } = useStyles();
    return (
        <>
            <Header></Header>
            <div>
                <Container sx={{ pb: 4, pt: 15 }}>
                    <Typography variant="h2" sx={{ pt: 2, my: 3 }}>
                        All Your desired product is here
                    </Typography>

                    <Box sx={{ display: "flex" }}>
                        <Typography variant="body1"> Categories </Typography>
                        <Box>
                            <Link to={`${url}`}>
                                <button className={category}>All</button>
                            </Link>
                            <Link to={`${url}/cinematic`}>
                                <button className={category}>Cinematic</button>
                            </Link>
                            <Link to={`${url}/professional`}>
                                <button className={category}>
                                    Professional
                                </button>
                            </Link>
                            <Link to={`${url}/surveillence`}>
                                <button className={category}>
                                    Surveillence
                                </button>{" "}
                            </Link>
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 1 }} />
                    {
                        <Switch>
                            <Route exact path={path}>
                                {allProducts.length > 0 ? (
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                        {allProducts.map((product) => (
                                            <SingleProduct
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </Grid>
                                ) : (
                                    <CircularProgress />
                                )}
                            </Route>
                            <Route path={`${path}/cinematic`}>
                                {allProducts.length > 0 ? (
                                    <Grid container spacing={3} sx={{ mt: 1 }}>
                                        {cinematicDrones.map((product) => (
                                            <SingleProduct
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </Grid>
                                ) : (
                                    <CircularProgress />
                                )}
                            </Route>
                            <Route path={`${path}/surveillence`}>
                                {allProducts.length > 0 ? (
                                    <Grid container spacing={3} sx={{ mt: 1 }}>
                                        {surveillenceDrones.map((product) => (
                                            <SingleProduct
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </Grid>
                                ) : (
                                    <CircularProgress />
                                )}
                            </Route>
                            <Route path={`${path}/professional`}>
                                {allProducts.length > 0 ? (
                                    <Grid container spacing={3} sx={{ mt: 1 }}>
                                        {professionalDrones.map((product) => (
                                            <SingleProduct
                                                key={product._id}
                                                product={product}
                                            />
                                        ))}
                                    </Grid>
                                ) : (
                                    <CircularProgress />
                                )}
                            </Route>
                        </Switch>
                    }
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;

/* 

   <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Cinematic
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    {allProducts.length > 0 ? (
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            {cinematicDrones.map((product) => (
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <CircularProgress />
                    )}

                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Professional
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    {allProducts.length > 0 ? (
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            {professionalDrones.map((product) => (
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <CircularProgress />
                    )}

                    <Typography variant="h6" sx={{ textAlign: "left", mt: 4 }}>
                        Category/Surviellence
                    </Typography>
                    <Divider sx={{ mt: 1 }} />
                    {allProducts.length > 0 ? (
                        <Grid container spacing={3} sx={{ mt: 1 }}>
                            {surveillenceDrones.map((product) => (
                                <SingleProduct
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    ) : (
                        <CircularProgress />
                    )}

*/
