import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <Typography variant="h2"> 404 </Typography>
            <Typography variant="h2"> Page Not Found </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ mt: 5 }}>
                    Back To Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
