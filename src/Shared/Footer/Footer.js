import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
const Footer = () => {
    return (
        <div style={{ backgroundColor: "#03071a" }}>
            <Container sx={{ py: 3, color: "white" }}>
                <Grid container spacing={3}>
                    <Grid item md={3} sm={6} xs={12}>
                        <Box>
                            <Box>
                                <img
                                    src={logo}
                                    alt=""
                                    style={{ width: "75%" }}
                                />
                                <Typography variant="h6">
                                    Your best drone seller
                                </Typography>
                                <Typography variant="body1">Address</Typography>
                                <Typography variant="body1">
                                    53 Jacob street, London
                                </Typography>
                                <Typography variant="body1">Uk</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Link
                            style={{
                                margin: "10px 0",
                                display: "block",
                                color: "white",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            Terms and conditions
                        </Link>
                        <Link
                            style={{
                                margin: "10px 0",
                                display: "block",
                                color: "white",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            Privacy policy
                        </Link>
                        <Link
                            style={{
                                margin: "10px 0",
                                display: "block",
                                color: "white",
                                textDecoration: "none",
                            }}
                            to="/"
                        >
                            Site map
                        </Link>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h5">
                            Subscribe to our newsletter
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <form onSubmit="" style={{ display: "flex" }}>
                                <input type="email" />
                                <Button
                                    variant="contained"
                                    sx={{ borderRadius: 0, border: 0 }}
                                    type="submit"
                                >
                                    Subscribe
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        sm={6}
                        xs={12}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h5">Contact us</Typography>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body1">
                                Email: contact@virwings.com
                            </Typography>
                            <Typography variant="body1">
                                Phone: +1 596 48982
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
