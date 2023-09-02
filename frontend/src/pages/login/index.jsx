import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getClient from '../../lib/api';
import styles from './styles/LoginContainer.module.scss';
import { fetchUserSuccess } from '../../store/slices/LoggedInUserSlice';
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
import AuthLayout from '../../shared/layout/authLayout/AuthLayout';

const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .required("Please enter the email"),
    password: yup
        .string()
        .min(4)
        .max(15)
        .required("Please enter the password"),
})

const Login = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors}} = useForm({
        resolver: yupResolver(LoginSchema),
    })
    const [ error, setError] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const loggedInUser = useSelector(state => state.loggedInUser);
    const login = () => {
        getClient()
        .post('/auth/login/', {
            'email': email,
            'password': password
        }).then(async(res) =>{
            console.log(res)
            document.cookie = "token="+res.data.token+";expires=Thu, 01 Aug 2030 00:00:00 UTC; path=/;";
            await fetchUserSuccess(res.data.user)
            router.push("/");
        }).catch(err => {
            console.log(err)
            setError(err.response.data.msg)
        })
    }
    useEffect(()=> {
        if (loggedInUser.isLoggedIn) router.push("/")
    }, [router, loggedInUser])
    
    return(
        <>
            <div className={styles.title}>Welcome to GlobalAid</div>
            <div className={styles.info}>
                <p>Sign In to Continue.</p>

                <p>Don't have an account? <Link className={styles.link} href="/signup/"> Create an account </Link></p>
                It takes less than a minute.
            </div>
            {error && (<Alert severity="error">{error}</Alert>)}
            <form onSubmit={handleSubmit(login)}>
                <div className={styles.inputWrapper}>
                    <TextField
                        fullWidth
                        {...register("email")}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                </div>
                <div className={styles.inputWrapper}>
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
                        <FormHelperText>{errors.password?.message}</FormHelperText>
                    </FormControl>
                </div>
                <Grid container>
                <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    fullWidth
                >Sign In</Button>
                </Grid>
                
            </form>
        </>
    )
}
export default Login;

Login.getLayout = function getLayout(page){
    return <AuthLayout>{page}</AuthLayout>

}