import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container, useTheme, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { makeStyles } from "@mui/styles";
import logo from "../../images/logo.png";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const Header = () => {
    const theme = useTheme();
    //drawer state
    const [state, setState] = React.useState(false);
    const useStyles = makeStyles({
        navIcon: {
            [theme.breakpoints.up("sm")]: {
                display: "none !important",
            },
        },
        menu: {
            [theme.breakpoints.down("sm")]: {
                display: "none !important",
            },
        },
        navLink: {
            textDecoration: "none",
            margin: "0 10px",
            fontWeight: 500,
        },
    });
    const { user, logOut } = useAuth();

    // Styled Classes
    const { navIcon, navLink, menu } = useStyles();

    const handleLogOut = () => {
        logOut();
    };

    ///DRAWER

    const list = (
        <Box
            sx={{
                width: 250,
            }}
            role="presentation"
        >
            <List>
                <ListItem button>
                    <ListItemText>
                        <Link className={navLink} to="/">
                            Home
                        </Link>{" "}
                    </ListItemText>
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText>
                        <Link className={navLink} to="/">
                            Dashboard
                        </Link>{" "}
                    </ListItemText>
                </ListItem>
                <Divider />

                <Divider sx={{ mt: 2 }} />
                {user.email ? (
                    <ListItem button>
                        <ListItemText onClick={handleLogOut}>
                            Logout
                        </ListItemText>
                    </ListItem>
                ) : (
                    <ListItem button>
                        <ListItemText>
                            <Link className={navLink} to="/login">
                                Login
                            </Link>{" "}
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <>
            <Container>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar
                        position="fixed"
                        sx={{
                            backgroundColor: "#ffffff30",
                            boxShadow: 1,
                            backdropFilter: "blur(10px)",
                            display: "flex",
                        }}
                    >
                        <Toolbar>
                            <Box>
                                <Link to="/">
                                    <img
                                        src={logo}
                                        style={{ width: "100%" }}
                                        alt=""
                                    />
                                </Link>
                            </Box>
                            <Box sx={{ ml: "auto" }} className={menu}>
                                <Link className={navLink} to="/">
                                    Home
                                </Link>
                                <Link className={navLink} to="/">
                                    {" "}
                                    Dashboard
                                </Link>
                                {user.email ? (
                                    <Button
                                        onClick={handleLogOut}
                                        variant="contained"
                                    >
                                        Log out
                                    </Button>
                                ) : (
                                    <Link className={navLink} to="/login">
                                        {" "}
                                        Login
                                    </Link>
                                )}
                            </Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2, color: "primary", ml: "auto" }}
                                className={navIcon}
                                onClick={() => setState(true)}
                            >
                                <MenuIcon sx={{ transform: "scale(1.5)" }} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Container>
            <div>
                <React.Fragment>
                    <Drawer
                        open={state}
                        onClose={() => setState(false)}
                        sx={{
                            backdropFilter: "blur(10px)",
                            backgroundColor: "transparent",
                        }}
                    >
                        {list}
                    </Drawer>
                </React.Fragment>
            </div>
        </>
    );
};

export default Header;
