import { AppBar, Container, Toolbar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <AppBar position="static" color="secondary" style={{ minHeight: 85 }}>
      <Container maxWidth="md">
        <Toolbar>
          <Grid container justifyContent="center">
            <Typography variant="body1" color="inherit">
              &copy; 2021 Ciranda, Inc. All Rights Reserved
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
