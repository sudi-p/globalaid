import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import getClient from '../../lib/api';
import styles from './styles/LoginContainer.module.scss';
import { fetchUserSuccess } from '../navBar/LoggedInUserSlice';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            dispatch(fetchUserSuccess({email: res.data.user.email}))
            await navigate("/");
        }).catch(err => {
            setError(err.response.data.msg)
        })
    }
    useEffect(()=> {
        if (loggedInUser.isLoggedIn) navigate("/")
    }, [navigate, loggedInUser])
    
    return(
        <div className={styles.login}>
            Welcome to GlobalAid,
            Sign In to Continue.

            Don't have an account? <Link to="/signup/"> Create a account </Link>
            It takes less than a minute.
            <span className={styles.error}>{error}</span>
            <input className={styles.input} type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className={styles.input} type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
            Forgot Password?
            <button onClick={() => login()}>Sign In</button>
        </div>
    )
}
export default LoginContainer;