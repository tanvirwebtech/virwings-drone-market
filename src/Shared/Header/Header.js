import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container, useTheme, Button, Avatar } from "@mui/material";
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
    const theme = useTheme();
    //drawer state
    const [state, setState] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
            paddingBottom: "1rem",
            fontWeight: 500,
            transition: "0.3s all",
            "&:hover": {
                borderBottom: "2px solid #172774",
            },
            "&:focus": {
                color: "lightgreen",
            },
        },
    });
    const { user, logOut } = useAuth();

    // Styled Classes
    const { navIcon, navLink, menu } = useStyles();

    const handleLogOut = () => {
        handleClose();
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
                <ListItem button>
                    <ListItemText>
                        <Link className={navLink} to="/all-products">
                            All Drones
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
                                <Link className={navLink} to="/all-products">
                                    All Drones
                                </Link>
                                {user.email ? (
                                    <Link className={navLink} to="/dashboard">
                                        {" "}
                                        Dashboard
                                    </Link>
                                ) : (
                                    ""
                                )}
                                {user.email ? (
                                    <Button title={user.displayName}>
                                        <Avatar
                                            aria-controls="basic-menu"
                                            aria-haspopup="true"
                                            aria-expanded={
                                                open ? "true" : undefined
                                            }
                                            onClick={handleClick}
                                            alt={user.displayName}
                                            src={user.photoURL}
                                        />
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{ mt: 1 }}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Link to="/profile">
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default Header;
