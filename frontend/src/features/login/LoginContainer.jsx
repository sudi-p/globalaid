import React, { useState } from 'react';
import getClient from '../../lib/api';
import { useDispatch } from 'react-redux';
import styles from './styles/LoginContainer.module.scss';
import { loginStart, loginSuccess, loginFail } from './LoginSlice';
import axios from 'axios';
import BoxWrapper from '../../components/boxWrapper/BoxWrapper';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const login = () => {
        dispatch(loginStart)
        getClient()
        .post('http://localhost:3001/auth/login', {
            'username': username,
            'password': password
        }).then(res =>{
            console.log(res)
            dispatch(loginSuccess(res.data))
        }).catch(err => {
            dispatch(loginFail(err.message))
        })
    }
    return(
        <BoxWrapper>
            Login
            <input className={styles.input} type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            <input className={styles.input} type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={() => login()}>Submit</button>
        </BoxWrapper>
    )
}
export default LoginContainer;