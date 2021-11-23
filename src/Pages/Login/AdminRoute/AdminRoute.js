import React from "react";
import { CircularProgress } from "@mui/material";

import { Route, Redirect } from "react-router";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
    const { isLoading, admin } = useAuth();
    if (isLoading && !admin) {
        return <CircularProgress />;
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                admin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
export default AdminRoute;
