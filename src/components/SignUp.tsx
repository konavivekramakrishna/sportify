import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../utils/apiCallUtils";
import { SignUpInputDataType } from "../types";
import { Link as Navigate } from "react-router-dom";
import { UserContext } from "../context/user";
export default function SignUp(props: { handleSignupCB: () => void }) {
  const { setUser } = React.useContext(UserContext);
  const navigator = useNavigate();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit } = useForm<SignUpInputDataType>();

  const onSubmit: SubmitHandler<SignUpInputDataType> = async (data) => {
    const { name, email, password } = data;
    try {
      const res = await createNewUser({
        name,
        email,
        password,
      });

      if (rememberMe) {
        localStorage.setItem("token", res.token);
      } else {
        sessionStorage.setItem("token", res.token);
      }
      setUser(res.user);
      localStorage.setItem("userData", JSON.stringify(res.user));
      navigator("/home");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Typography component="h1" variant="h5">
        SignUp
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          required
          fullWidth
          {...register("name", { required: true })}
          id="name"
          label="Username"
          name="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          {...register("email", { required: true })}
          name="email"
          label="Email"
          type="email"
          id="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          {...register("password", { required: true })}
          name="password"
          label="Password"
          type="password"
          id="password"
        />

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
          Sign In
        </Button>
      </form>
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
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
