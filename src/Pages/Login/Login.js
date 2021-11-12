import React, { useState } from "react";
import {
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import login from "../../images/login.svg";
import { Link, useLocation } from "react-router-dom";
import "./Login.css";
import useAuth from "../../hooks/useAuth";
import Header from "../../Shared/Header/Header";
import { useHistory } from "react-router";

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { signInUsingGoogle, signInWithEmail } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
        signInWithEmail(loginData.email, loginData.password, history, location);
    };

    const handleGoogleLogin = () => {
        signInUsingGoogle().then((result) => {
            if (location?.state?.from) {
                history.replace(location.state.from);
            } else {
                history.replace("/");
            }
        });
    };

    const SecondaryButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#ffffff"),
        backgroundColor: "#172774",
        "&:hover": {
            backgroundColor: "#3146aa",
        },
    }));

    // RETURN//
    return (
        <Container sx={{ mt: 12 }}>
            <Header />
            <Grid container spacing={2} sx={{ mt: 5 }}>
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

                            width: 1,
                            border: 1,
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
                            Please Login Here
                        </Typography>
                        <form
                            onSubmit={handleSubmit}
                            style={{ display: "flex", flexDirection: "column" }}
                        >
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
                                Login
                            </Button>
                        </form>
                        <Typography>or</Typography>
                        <SecondaryButton
                            variant="contained"
                            sx={{
                                mt: 5,
                                backgroundColor: "secondary",
                                border: 0,
                                borderRadius: 0,
                                px: 3,
                                color: "#fff",
                                fontFamily: "Cairo",
                            }}
                            onClick={handleGoogleLogin}
                        >
                            Login with Google
                        </SecondaryButton>
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    mt: 4,
                                    fontWeight: 500,
                                }}
                            >
                                New to VirWings? Sign Up Here
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                    <Box sx={{ width: "90%", mx: "auto", my: 5 }}>
                        <img
                            className="login-img"
                            src={login}
                            alt=""
                            style={{ width: "100%" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;

/* 

<div>
      <Typography variant="h2">Please Login Here</Typography>
      <form>
        <TextField id="email" label="Email" type="email" variant="standard" />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="standard"
        />
        <Button variant="contained">Login</Button>
      </form>
    </div>


*/
