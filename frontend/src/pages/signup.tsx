import React, { ReactNode, useState } from 'react';
import  Link from "next/link";
import { useRouter } from "next/router";
import {
    TextField,InputLabel, OutlinedInput, FormControl, InputAdornment,
    IconButton,Button,Stack,FormHelperText,CircularProgress,
    Grid,Alert
} from "@mui/material/";
import {
    Visibility, VisibilityOff
} from '@mui/icons-material/';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import getClient from '../lib/api';
import AuthLayout from '../layout/authLayout/AuthLayout';
import { AxiosError } from 'axios';

const UserSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Please enter the first name."),
    lastName: yup
        .string()
        .required("Please enter the last name."),
    email: yup
        .string()
        .required("Please enter the email"),
    password: yup
        .string()
        .min(4, "Password must be at least 4 characters.")
        .max(15, "Password must not be more than 15 characters.")
        .required("Please enter the password"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "Confirm Password must match Password")
        .required("Please enter the confirm password"),
})

const SignUp = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors}} = useForm({
        resolver: yupResolver(UserSchema),
    })
    const [showPassword, setShowPassword] = React.useState(false);
    const [ loading, setLoading ] = useState(false);    
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const registerSubmit = () => {
        setLoading(true);
        setError('');
        getClient()
        .post('/auth/register/',{
            firstName,
            lastName,
            password,
            email
        })
        .then(() => router.push('/login/'))
        .catch((err: AxiosError) =>{
            setError(err.response?.data.msg);
            setLoading(false)
        });
    }
    return(
        <>
            <div className="text-3xl mb-7">Welcome to GlobalAid</div>
            <form onSubmit={handleSubmit(registerSubmit)}>
                {error && (<Alert severity="error">{error}</Alert>)}
                <Stack spacing={2} direction="row">
                    <div className="py-5">
                        <TextField
                            {...register("firstName")}
                            label="First Name"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message?.toString()}
                        />
                    </div>
                    <div className="py-5">
                        <TextField
                            {...register("lastName")}
                            label="Last Name"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message?.toString()}
                        />                   
                    </div>
                </Stack>
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
                <div className="my-5">
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.password)}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormHelperText>{errors.password?.message?.toString()}</FormHelperText>
                    </FormControl>
                </div>
                <div className="my-5">
                    <FormControl
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.confirmPassword)}>
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            {...register("confirmPassword")}
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
                            label="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FormHelperText>{errors.confirmPassword?.message?.toString()}</FormHelperText>
                    </FormControl>
                </div>
                <Grid
                    container
                    flexDirection="column"
                    justifyContent="flex-end"
                >
                    <div className="mt-2 mb-7">Already have an account? <Link href="/login/"><a className="no-underline text-green-400 font-bold">Sign In </a></Link> to continue</div>
                    <Button
                        variant='contained'
                        color="secondary"
                        type="submit"
                    >{loading ? (<CircularProgress color="success" />) : "Submit"}</Button>
                </Grid>
            </form>
        </>
    );
};

export default SignUp;

SignUp.getLayout = function getLayout(page: ReactNode) {
    return <AuthLayout>{page}</AuthLayout>
}