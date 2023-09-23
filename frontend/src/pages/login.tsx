import React, { useState, useEffect, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getClient from '../lib/api';
import { fetchUserSuccess } from '@store/slices/LoggedInUserSlice';
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
} from '@mui/material';
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material/';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthLayout from '../layout/authLayout/AuthLayout';
import { RootState } from "@store/store";
import { AxiosError, AxiosResponse } from 'axios';

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Please enter the email"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters")
        .max(15, "Password must not exceed 15 characters")
        .required("Please enter the password"),
})

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema),
    })
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
    const login = () => {
        getClient()
            .post('/auth/login/', {
                'email': email,
                'password': password
            }).then(async (res: AxiosResponse) => {
                console.log(res)
                document.cookie = "token=" + res.data.token + ";expires=Thu, 01 Aug 2030 00:00:00 UTC; path=/;";
                await fetchUserSuccess(res.data.user)
                router.push("/");
            }).catch((err: AxiosError) => {
                setError(err.response?.data)
            })
    }
    useEffect(() => {
        if (loggedInUser.isLoggedIn) router.push("/")
    }, [router, loggedInUser])

    return (
        <>
            <div className="text-3xl mb-8">Welcome to GlobalAid</div>
            <div className="tracking-wide leading-tight text-lg">
                <p>Sign In to Continue.</p>
                <p>Don't have an account? 
                    <Link href="/signup">
                        <a className='no-underline text-green-300 font-semibold ml-2'>
                            Create an account
                        </a>
                    </Link>
                </p>
                It takes less than a minute.
            </div>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit(login)}>
                <div className="py-5">
                    <TextField
                        fullWidth
                        {...register("email")}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                        <InputLabel id="password" htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormHelperText>{errors.password?.message?.toString()}</FormHelperText>
                    </FormControl>
                </div>
                <Grid container>
                    <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        fullWidth
                        data-testid="sign-in-button"
                    >Sign In</Button>
                </Grid>

            </form>
        </>
    )
}
export default Login;

Login.getLayout = function getLayout(page: ReactNode) {
    return <AuthLayout>{page}</AuthLayout>
}