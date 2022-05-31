import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newToken } from "redux/sliceToken";
import { useLoginUserMutation } from "server/contacts";
import { linkActiv } from "components/utilits/linkActiv";
import { isAuth } from "redux/sliceAuth";

import { toast } from "react-toastify";

// import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [createUser, { isError }] = useLoginUserMutation();
    const tosty = () => {
        toast.error("Error login");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const send = {
            email: data.get("email"),
            password: data.get("password"),
        };
        const responsToken = await createUser(send);
        console.log(responsToken);
        if (responsToken.data) {
            dispatch(newToken(responsToken.data.token));
            dispatch(isAuth(responsToken.data.user.name));
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {isError && tosty()}
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "#759ab6" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        pattern='/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <NavLink style={linkActiv} to="/register">
                                "Don't have an account? Sign Up"
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
