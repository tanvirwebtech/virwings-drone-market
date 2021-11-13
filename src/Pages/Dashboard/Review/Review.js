import { Button, Grid, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
const Review = () => {
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState([]);
    const [open, setOpen] = React.useState(false);

    const { user } = useAuth();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const { register, handleSubmit, reset } = useForm();

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        fetch(
            `https://nameless-lowlands-17762.herokuapp.com/orders/${user.email}`
        )
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [user.email]);
    React.useEffect(() => {
        fetch(`https://nameless-lowlands-17762.herokuapp.com/all-products`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [orders]);

    const onSubmit = (data) => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
        });
        reset();
        setOpen(false);
    };

    const getProduct = (id) => {
        const pd = product?.find((p) => p._id === id);
        return pd;
    };
    return (
        <>
            <div>
                <h3>Give a feedback to our product</h3>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        {orders.map((order) => {
                            return (
                                <Box
                                    key={order._id}
                                    sx={{
                                        my: 2,
                                        p: 1,
                                        border: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography variant="h5">
                                        {getProduct(order.productId)?.modelName}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={handleClickOpen}
                                    >
                                        Rate This Product
                                    </Button>
                                </Box>
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1">
                            *You can review only products you have purchased
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        style: {
                            backgroundColor: "#fff",
                            borderRadius: 0,
                            width: "440px",
                        },
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Give your feedback"}
                    </DialogTitle>
                    <DialogContent>
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
                                {...register("email")}
                                type="email"
                                id="email"
                                required
                                defaultValue={user.email}
                                readOnly
                            />
                            <label htmlFor="product-name">Product name</label>
                            <input
                                {...register("productname")}
                                type="text"
                                id="product-name"
                                required
                            />

                            <label htmlFor="rating">Rating</label>
                            <input
                                {...register("rating", { min: 1, max: 5 })}
                                type="number"
                                id="rating"
                                required
                            />
                            <label htmlFor="review">Review</label>
                            <textarea
                                {...register("review")}
                                type="text"
                                id="review"
                                required
                            />

                            <Button
                                type="submit"
                                id="submit"
                                color="secondary"
                                variant="contained"
                                required
                            >
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Review;
