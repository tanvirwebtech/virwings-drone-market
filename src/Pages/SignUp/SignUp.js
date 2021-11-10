import React, { useState } from "react";
import {
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Box,
} from "@mui/material";

import { Link } from "react-router-dom";

import signup from "../../images/signup.svg";
const SignUp = () => {
    const [signUpData, setSignUpData] = useState({});
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...signUpData };
        newLoginData[field] = value;
        setSignUpData(newLoginData);
    };
    const handleSubmit = (e) => {
        console.log(signUpData);
        e.preventDefault();
    };
    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sm={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            p: 5,
                            border: 1,
                            width: 1,
                            backdropFilter: "blur(20px)",
                            backgroundColor: "#ffffff20",
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                pb: 4,
                                fontFamily: "Maven Pro",
                                fontWeight: 500,
                            }}
                        >
                            Sign Up Here
                        </Typography>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <TextField
                                id="userName"
                                label="Full Name"
                                type="text"
                                name="userName"
                                onBlur={handleInput}
                                variant="standard"
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                onBlur={handleInput}
                                variant="standard"
                                sx={{ mb: 3, width: 1 }}
                            />
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                name="password"
                                onBlur={handleInput}
                                variant="standard"
                                sx={{ mb: 3 }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    border: 0,
                                    borderRadius: 0,
                                    px: 3,
                                    fontFamily: "Cairo",
                                    fontWeight: 600,
                                }}
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Typography>or</Typography>

                        <Link
                            to="/login"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                display="block"
                                sx={{
                                    mt: 4,
                                    fontWeight: 500,
                                }}
                                gutterBottom
                            >
                                Already Member? Sign in Here
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                    <Box sx={{ width: "90%", mx: "auto", my: 5 }}>
                        <img
                            className="login-img"
                            src={signup}
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUp;
