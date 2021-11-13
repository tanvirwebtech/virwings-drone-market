import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";

const MakeAdmin = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
    }, []);
    const handleMakeAdmin = (email) => {
        const user = { email };
        fetch("http://localhost:5000/users/admin", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
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
            </Box>
        </div>
    );
};

export default MakeAdmin;
