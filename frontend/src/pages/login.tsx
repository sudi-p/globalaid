import React, { useState, useEffect, ReactNode, useContext } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "@lib/api";
import { toast } from "react-toastify";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthLayout from "@components/layout/authLayout/AuthLayout";
import { RootState } from "@store/store";
import { addAuthToStorage } from "@utils/cookie-utils";

const LoginSchema = yup.object().shape({
  email: yup.string().required("Please enter the email"),
  password: yup.string().required("Please enter the password"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const [error, setError] = useState("");
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const login = async (data: FieldValues): Promise<void> => {
    const email = data.email as string;
    const password = data.password as string;
    try {
      const res = await axios.post(
        "/auth/login/",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      const user = res?.data?.user;
      await addAuthToStorage(user);
      router.push("/dashboard/");
      toast.success("Login Succesfull");
    } catch (err: any) {
      console.log(err);
      setError(err?.response?.data?.msg);
    }
  };
  useEffect(() => {
    if (loggedInUser.isLoggedIn) router.push("/");
  }, [router, loggedInUser]);
  return (
    <>
      <div className="text-3xl mb-8">Welcome to GlobalAid</div>
      <div className="tracking-wide leading-tight text-lg">
        <p>Sign In to Continue.</p>
        <p>
          Don&apos;t have an account?
          <Link
            href="/signup"
            className="no-underline text-green-300 font-semibold ml-2"
          >
            Create an account
          </Link>
        </p>
        It takes less than a minute.
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit(login)}>
        <div className="py-5">
          <TextField
            fullWidth
            {...register("email")}
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message?.toString()}
          />
        </div>
        <div className="py-5">
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(errors.password)}
          >
            <InputLabel id="password" htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              {...register("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              id="outlined-adornment-password"
              label="Password"
            />
            <FormHelperText>
              {errors.password && errors.password?.message?.toString()}
            </FormHelperText>
          </FormControl>
        </div>
        <Grid container>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            data-testid="sign-in-button"
          >
            Sign In
          </Button>
        </Grid>
      </form>
    </>
  );
};
export default Login;

Login.getLayout = function getLayout(page: ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
