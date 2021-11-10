import React from "react";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./HomeBanner.css";

const HomeBanner = () => {
    const SecondaryButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText("#ffffff"),
        backgroundColor: "#172774",
        "&:hover": {
            backgroundColor: "#3146aa",
        },
    }));
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sm={6}>
                    <Box sx={{ py: 10, mt: 10 }}>
                        <Typography variant="caption" sx={{ fontSize: "20px" }}>
                            Welcome to
                        </Typography>
                        <Typography variant="h2">
                            Virwings - Your best drone Seller{" "}
                        </Typography>
                        <Typography variant="body1">
                            All new modern drone is here. Buy drone from us. We
                            have alreday sold 1100+ drones all over the globes.
                        </Typography>
                        <SecondaryButton
                            variant="contained"
                            sx={{ color: "#fff", mt: 3, borderRadius: 0 }}
                        >
                            View All Drones
                        </SecondaryButton>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sm={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ width: 1, mt: 10 }}>
                        <img
                            src="https://i.ibb.co/sqNgHBr/High-Great-Hesper.gif"
                            alt=""
                            style={{ width: "100%" }}
                            className="drone"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeBanner;
