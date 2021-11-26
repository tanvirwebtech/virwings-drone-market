import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import SignUp from "./Pages/SignUp/SignUp";
import AuthProvider from "./Context/AuthProvider";
import AllProducts from "./Pages/AllProducts/AllProducts";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import PurchaseProduct from "./Pages/PurchaseProduct/PurchaseProduct";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#73f669",
        main: "#4fd445",
        dark: "#0a9600",
        contrastText: "#fff",
      },
      secondary: {
        light: "#3146aa",
        main: "#172774",
        dark: "#0a1441",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: ["Maven Pro", "sans-serif", "Cairo"].join(","),
    },
  });
  theme.typography.h3 = {
    fontSize: "1.2rem",
    fontFamily: "Maven Pro",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };
  theme.typography.h2 = {
    fontSize: "1.5rem",
    fontFamily: "Maven Pro",
    fontWeight: 500,
    "@media (min-width:600px)": {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>

              <Route path="/all-products">
                <AllProducts />
              </Route>
              <PrivateRoute path="/purchase-product/:id">
                <PurchaseProduct />
              </PrivateRoute>
              <PrivateRoute path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>

              <Route path="*" element={<NotFound></NotFound>}></Route>
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
