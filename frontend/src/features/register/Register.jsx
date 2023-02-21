import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import getClient from '../../lib/api';
import styles from './styles/Register.module.scss';
import BoxWrapper from '../../components/boxWrapper/BoxWrapper';

const Register = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ retypePassword, setRetypePassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ firstNameError, setFirstNameError ] = useState('');
    const [ lastNameError, setLastNameError ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ retypePasswordError, setRetypePasswordError ] = useState('');
    const [ emailError, setEmailError ] = useState('');

    const registerSubmit = () => {
        setLoading(true);
        setError('');
        setFirstNameError('')
        setLastNameError('')
        setPasswordError('')
        setRetypePasswordError('')
        setRetypePasswordError('')
        setEmailError('')
        if (!firstName) setFirstNameError('Please enter your first name.')
        if (!lastName) setLastNameError('Please enter your first name.')
        if (!password) setPasswordError('Please enter your first name.')
        if (!retypePassword) setRetypePasswordError('Please enter password.')
        if (password !== retypePassword) setRetypePasswordError('Password and Retpye Pawword donot match')
        if (!email) setEmailError('Please enter your first name.')
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
        <BoxWrapper>
            Register
            <span className={styles.inputError}>{error}</span>
            <div className={styles.inputWrapper}>
                <div className={styles.label}>First Name </div>
                <input className={styles.input} type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                <span className={styles.inputError}>{firstNameError}</span>
            </div>
            <div className={styles.inputWrapper}>
                Last Name
                <input className={styles.input} type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                <span className={styles.inputError}>{lastNameError}</span>
            </div>
            <div className={styles.inputWrapper}>
                Email
                <input className={styles.input} type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <span className={styles.inputError}>{emailError}</span>
            </div>
            <div className={styles.inputWrapper}>
                Password
                <input className={styles.input} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <span className={styles.inputError}>{passwordError}</span>
            </div>
            <div className={styles.inputWrapper}>
                Retype Password
                <input className={styles.input} type="password" onChange={(e) => setRetypePassword(e.target.value)} value={retypePassword} />
                <span className={styles.inputError}>{retypePasswordError}</span>
            </div>
            <button className={styles.submitButton} onClick={() => registerSubmit() }>Submit</button>
            {loading && (<span>Loading</span>)}
        </BoxWrapper>
    );
};

export default Register;