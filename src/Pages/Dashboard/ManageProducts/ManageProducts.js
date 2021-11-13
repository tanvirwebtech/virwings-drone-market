import { Container, Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/all-products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    const handleDelete = (product) => {
        const confirm = window.confirm("are you sure?");
        console.log(product);
        if (confirm) {
            fetch(
                `https://nameless-lowlands-17762.herokuapp.com/products/${product._id}`,
                {
                    method: "DELETE",
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    const rest = products.filter(
                        (pd) => pd._id !== product._id
                    );
                    setProducts(rest);
                });
        }
    };
    return (
        <Container>
            <Typography variant="h4" sx={{ my: 2 }}>
                All Your Products
            </Typography>
            <Box>
                {products?.map((product) => (
                    <>
                        <Box
                            key={product._id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: { md: "75%", sm: "100%" },
                                py: 1,
                                px: 2,
                                border: 1,
                                my: 1,
                                backgroundColor: "#fff",
                            }}
                        >
                            <Box>
                                <Typography variant="body1">
                                    Product Name: {product.modelName}{" "}
                                </Typography>
                                <Typography variant="subtitle">
                                    Category: {product.category}
                                </Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(product)}
                                >
                                    Delete Product
                                </Button>
                            </Box>
                        </Box>
                        {/* <ManageProductModal
                            product={product}
                            open={open}
                            handleClose={handleClose}
                        ></ManageProductModal> */}
                    </>
                ))}
            </Box>
        </Container>
    );
};

export default ManageProducts;
