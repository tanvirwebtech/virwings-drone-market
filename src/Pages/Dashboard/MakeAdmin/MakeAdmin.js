import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Alert } from "@mui/material";

const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        fetch("https://nameless-lowlands-17762.herokuapp.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    const handleMakeAdmin = (email) => {
        const user = { email };
        fetch("https://nameless-lowlands-17762.herokuapp.com/users/admin", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    successReset();
                }
            });
    };
    const successReset = () => {
        setTimeout(() => setSuccess(false), 5000);
    };
    return (
        <div>
            <Typography variant="h4">Make an Admin</Typography>
            <Box>
                {users?.map((user) => (
                    <Box
                        key={user._id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: { md: "50%", sm: "100%" },
                            py: 1,
                            px: 2,
                            border: 1,
                            my: 1,
                            backgroundColor: "#fff",
                        }}
                    >
                        <Box>
                            <Typography variant="body1">
                                Name: {user.displayName}{" "}
                            </Typography>
                            <Typography variant="subtitle">
                                Email: {user.email}
                            </Typography>
                        </Box>
                        <Box>
                            {user.role === "admin" ? (
                                <Button variant="contained" disabled>
                                    Already Admin
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => handleMakeAdmin(user.email)}
                                >
                                    Make Admin
                                </Button>
                            )}
                        </Box>
                    </Box>
                ))}
                {success ? (
                    <Alert severity="success">Admin Added SuccessfUlly</Alert>
                ) : (
                    ""
                )}
            </Box>
        </div>
    );
};

export default MakeAdmin;
