import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Grid,
    Box,
    Typography,
    Snackbar,
    Alert,
    Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import "./PurchaseProduct.css";
const PurchaseProduct = () => {
    const { user } = useAuth();
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    //

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    //

    const onSubmit = (data) => {
        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
        });
        console.log(data);
        setOpen(true);
        reset();
    };

    return (
        <>
            <Header />
            <Container sx={{ mt: 15 }}>
                <Typography variant="h2" sx={{ mt: 12 }} color="secondary">
                    {product.modelName}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Grid container spacing={3}>
                    <Grid item md={6} sm={8} xs={12} sx={{ mx: "auto", mt: 5 }}>
                        <Box sx={{ p: 3 }}>
                            <img
                                src={product.img}
                                style={{ width: "100%" }}
                                alt="product img"
                            />
                        </Box>
                        <Box>
                            <Typography variant="h3">
                                Product Name / Model:{product.modelName}
                            </Typography>
                            <Typography variant="h4">
                                Price:${product.price} /
                                <strike>{product.oldPrice}</strike>
                            </Typography>
                            <Typography variant="subtitle1">
                                Company:{product.company}
                            </Typography>
                            <Typography variant="subtitle1">
                                Drone Category:{product.category}
                            </Typography>
                            <Box>
                                Details:
                                {product?.desc?.split(">").map((des, i) => (
                                    <p key={i}>{des}</p>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={8} xs={12} sx={{ mx: "auto" }}>
                        <Box className="purchase-form" sx={{ p: 1, ml: 2 }}>
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 500, my: 2 }}
                            >
                                Please provide required info
                            </Typography>
                            {product._id && user.email ? (
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        {...register("name")}
                                        type="text"
                                        id="name"
                                        required
                                        defaultValue={user.displayName}
                                        readOnly
                                    />
                                    <label htmlFor="email">Email</label>
                                    <input
                                        {...register("company")}
                                        type="email"
                                        id="email"
                                        required
                                        defaultValue={user.email}
                                        readOnly
                                    />
                                    <label htmlFor="product-id">
                                        Product ID
                                    </label>
                                    <input
                                        {...register("productId")}
                                        type="text"
                                        id="product-id"
                                        required
                                        defaultValue={product._id}
                                        readOnly
                                    />
                                    <label htmlFor="address">Address</label>
                                    <input
                                        {...register("address")}
                                        type="address"
                                        required
                                        id="address"
                                        placeholder="Address"
                                    />

                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        {...register("phone")}
                                        type="tel"
                                        required
                                        id="phone"
                                        placeholder="Mobile"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, fontSize: "1.5rem" }}
                                    >
                                        Place Order
                                    </Button>
                                </form>
                            ) : (
                                ""
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%", fontSize: "1.2rem" }}
                    >
                        Order placed successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default PurchaseProduct;
