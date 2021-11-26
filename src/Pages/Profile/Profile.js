import React from "react";
import { Container, Typography } from "@mui/material";
import Header from "../../Shared/Header/Header";
const Profile = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 12 }}>
        <Typography variant="h2">This is profile</Typography>
      </Container>
    </>
  );
};

export default Profile;
