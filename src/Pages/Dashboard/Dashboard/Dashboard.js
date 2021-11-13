import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import MyOrders from "../MyOrders/MyOrders";
import Pay from "../Pay/Pay";
import Review from "../Review/Review";
import logo from "../../../images/logo.png";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import AdminRoute from "../../Login/AdminRoute/AdminRoute";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ManageProducts from "../ManageProducts/ManageProducts";
import ManageAllOrders from "../ManageOrders/ManageOrders";

const drawerWidth = 220;
function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { logOut, admin } = useAuth();

    // Custom Styled classes
    const useStyles = makeStyles({
        link: {
            display: "block",
            width: "100%",
            textDecoration: "none",
        },
    });
    const { link } = useStyles();
    //----------------//

    const handleLogOut = () => {
        logOut();
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    //Nested Routing
    let { path, url } = useRouteMatch();

    const drawer = (
        <div>
            <Toolbar>
                <Box>
                    <Link to="/">
                        <img src={logo} style={{ width: "100%" }} alt="" />
                    </Link>
                </Box>
            </Toolbar>
            <Divider />
            {!admin && (
                <Box sx={{ mt: 5 }}>
                    <Link className={link} to={`${url}`}>
                        <Button color="secondary">My Orders</Button>
                    </Link>
                    <Divider />
                    <Link className={link} to={`${url}/review`}>
                        <Button color="secondary">Review</Button>
                    </Link>
                    <Divider />
                    <Link className={link} to={`${url}/pay`}>
                        <Button color="secondary">Pay</Button>
                    </Link>
                </Box>
            )}
            <Divider />
            {admin && (
                <Box sx={{ mt: 4 }}>
                    <Link className={link} to={`${url}/make-admin`}>
                        <Button color="secondary">Make Admin</Button>
                    </Link>

                    <Divider />
                    <Link className={link} to={`${url}/add-product`}>
                        <Button color="secondary">Add New Product</Button>
                    </Link>

                    <Divider />
                    <Link className={link} to={`${url}/manage-product`}>
                        <Button color="secondary">Manage Products</Button>
                    </Link>

                    <Divider />
                    <Link className={link} to={`${url}/manage-all-orders`}>
                        <Button color="secondary">Manage All Orders</Button>
                    </Link>
                </Box>
            )}

            <Divider />

            <Button color="primary" onClick={handleLogOut}>
                Log out
            </Button>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    <Switch>
                        <Route exact path={path}>
                            <MyOrders />
                        </Route>
                        <Route path={`${path}/pay`}>
                            <Pay />
                        </Route>
                        <Route path={`${path}/review`}>
                            <Review />
                        </Route>
                        <AdminRoute path={`${path}/make-admin`}>
                            <MakeAdmin />
                        </AdminRoute>
                        <AdminRoute path={`${path}/add-product`}>
                            <AddNewProduct />
                        </AdminRoute>
                        <AdminRoute path={`${path}/manage-product`}>
                            <ManageProducts />
                        </AdminRoute>
                        <AdminRoute path={`${path}/manage-all-orders`}>
                            <ManageAllOrders />
                        </AdminRoute>
                    </Switch>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
