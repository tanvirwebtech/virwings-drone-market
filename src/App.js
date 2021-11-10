import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import SignUp from "./Pages/SignUp/SignUp";
function App() {
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
        typography: {
            fontFamily: ["Maven Pro", "sans-serif", "Cairo"].join(","),
        },
    });
    theme.typography.h3 = {
        fontSize: "1.2rem",
        "@media (min-width:600px)": {
            fontSize: "1.5rem",
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "2.4rem",
        },
    };

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<SignUp />}></Route>

                        <Route path="*" element={<NotFound></NotFound>}></Route>
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
