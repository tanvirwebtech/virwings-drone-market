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
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../Shared/Header/Header";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import "./PurchaseProduct.css";
import Footer from "../../Shared/Footer/Footer";

const PurchaseProduct = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    fetch(`https://nameless-lowlands-17762.herokuapp.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  //

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //
  const onSubmit = (data) => {
    const newData = { ...data, status: "pending" };
    fetch("https://nameless-lowlands-17762.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((res) => {});
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
          <Grid item md={6} sm={8} xs={12} sx={{ mx: "auto", mt: 3 }}>
            {!product.img ? (
              <CircularProgress />
            ) : (
              <Box sx={{ p: 3 }}>
                <img
                  src={product.img}
                  style={{ width: "100%" }}
                  alt="product img"
                />
              </Box>
            )}
            <Box>
              <Box>
                <Typography sx={{ textAlign: "left" }} variant="h4">
                  Product Name / Model: <span>{product.modelName}</span>
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  display: "inline-block",
                  backgroundColor: "mediumspringgreen",
                  py: "2px",
                  px: "0.5rem",
                  borderRadius: "0.4rem",
                }}
              >
                Price:${product.price} /<strike>{product.oldPrice}</strike>
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
              <Typography variant="h3" sx={{ fontWeight: 500, my: 2 }}>
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
                    {...register("email")}
                    type="email"
                    id="email"
                    required
                    defaultValue={user.email}
                    readOnly
                  />
                  <label htmlFor="product-id">Product ID</label>
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
                    color="secondary"
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", fontSize: "1.2rem" }}
          >
            Order placed successfully!
          </Alert>
        </Snackbar>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default PurchaseProduct;
