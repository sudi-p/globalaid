import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    TextField,
    InputLabel ,
    OutlinedInput,
    FormControl,
    InputAdornment ,
    IconButton,
    Button,
    Stack,
    Typography,
    FormHelperText,
    CircularProgress
} from "@mui/material/";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material/';
import getClient from '../../lib/api';
import styles from './styles/Register.module.scss';

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
        .min(4)
        .max(15)
        .required("Please enter the password"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})

const Register = (props) => {
    
    const navigate = useNavigate();
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
        console.log()
        setLoading(true);
        setError('');
        getClient()
        .post('/auth/register/',{
            firstName,
            lastName,
            password,
            email
        })
        .then(res => navigate('/login/'))
        .catch(err => setError(err.response.data.msg));
    }
    return(
        <div className={styles.register}>
            <Typography variant="h4" gutterBottom>Welcome to GlobalAid</Typography>
            <form onSubmit={handleSubmit(registerSubmit)}>
                <span className={styles.inputError}>{error}</span>
                <Stack spacing={2} direction="row">
                    <div className={styles.inputWrapper}>
                        <TextField
                            {...register("firstName")}
                            type="text"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            error={Boolean(errors.firstName)}
                            helperText={errors.firstName?.message}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <TextField
                            {...register("lastName")}
                            className={styles.input}
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            error={Boolean(errors.lastName)}
                            helperText={errors.lastName?.message}
                        />                   
                    </div>
                </Stack>
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
                <div className={styles.inputWrapper}>
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
                        <FormHelperText>{errors.confirmPassword?.message}</FormHelperText>
                    </FormControl>
                </div>

                <div>Already have an account? <Link to="/login/">Sign In </Link> to continue</div>
                <Button
                    variant='contained'
                    color="primary"
                    type="submit"
                >Submit</Button>
                {loading && (<CircularProgress color="success" />)}
            </form>
        </div>
    );
};

export default Register;