import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles/LoginContainer.module.scss';
import { loginStart, loginSuccess, loginFail } from './LoginSlice';
import axios from 'axios';

const LoginContainer = () => {
    const dispatch = useDispatch();
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const login = () => {
        dispatch(loginStart)
        axios.post('http://localhost:3001/auth/login', {
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
        <div>
            Login
            <input className={styles.input} type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
            <input className={styles.input} type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={() => login()}>Submit</button>
        </div>
    )
}
export default LoginContainer;