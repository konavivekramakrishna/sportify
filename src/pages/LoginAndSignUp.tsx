import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

const defaultTheme = createTheme();

export default function LoginAndSignUp() {
  const [signupForm, setSignupForm] = React.useState(false);

  const handleSignup = () => {
    setSignupForm(!signupForm);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="w-80">Sportify</div>
            {signupForm ? (
              <SignUp handleSignupCB={handleSignup} />
            ) : (
              <Login handleSignupCB={handleSignup} />
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
