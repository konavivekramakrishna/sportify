import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../utils/apiCallUtils";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LoginDataType } from "../types";
import { Link as Navigate } from "react-router-dom";
import { UserContext } from "../context/user";

export default function Login(props: { handleSignupCB: () => void }) {
  const { setUser } = React.useContext(UserContext);
  const [error, setError] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const { register, handleSubmit } = useForm<LoginDataType>();
  const navigator = useNavigate();
  const submit: SubmitHandler<LoginDataType> = async (data: any) => {
    const { email, password } = data;
    try {
      const data = await signInUser({ email, password });
      if (!data.auth_token) {
        setError("Invalid Credentials");
      } else {
        if (rememberMe) {
          localStorage.setItem("token", data.auth_token);
        } else {
          sessionStorage.setItem("token", data.auth_token);
        }
        setUser(data.user);
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigator("/home");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={handleSubmit(submit)}>
        <TextField
          margin="normal"
          {...register("email", { required: true })}
          fullWidth
          id="email"
          label="Email Id"
          name="email"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          {...register("password", { required: true })}
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        {error && <div className="text-red-500">{error}</div>}
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Navigate to={"/home"}>
              <Link href="#" className="hover:cursor-pointer" variant="body2">
                Home?
              </Link>
            </Navigate>
          </Grid>
          <Grid item>
            <Link
              onClick={props.handleSignupCB}
              className="hover:cursor-pointer"
              variant="body2"
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
