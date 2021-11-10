import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
const theme = createTheme({
    palette: {
        primary: {
            light: "#73f669",
            main: "#4fd445",
            dark: "#20661b",
            contrastText: "#172774",
        },
        secondary: {
            light: "#3146aa",
            main: "#172774",
            dark: "#0a1441",
            contrastText: "#fff",
        },
    },
});
const Header = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: "transparent",
                        boxShadow: 1,
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, color: "primary" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Home
                        </Typography>
                        <Link to="/login">
                            <Button
                                color="inherit"
                                sx={{
                                    textDecoration: "none",
                                    fontFamily: "Maven Pro",
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
