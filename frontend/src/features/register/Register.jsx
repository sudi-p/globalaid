import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/Register.module.scss';
import BoxWrapper from '../../components/boxWrapper/BoxWrapper';

const Register = (props) => {
    const [ loading, setLoading ] = useState(false)
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const registerSubmit = () => {
        setLoading(true);
        axios.post('https://localhost:3001/auth/register/',{
            firstName,
            lastName,
            password,
            email
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.message));
    }
    return(
        <BoxWrapper>
            Register
            <div className={styles.inputWrapper}>
                <div className={styles.label}>First Name </div>
                <input className={styles.input} type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </div>
            <div className={styles.inputWrapper}>
                Last Name
                <input className={styles.input} type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
            </div>
            <div className={styles.inputWrapper}>
                Email
                <input className={styles.input} type="text" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className={styles.inputWrapper}>
                Password
                <input className={styles.input} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <button className={styles.submitButton} onClick={() => registerSubmit() }>Submit</button>
            {loading && (<span>Loading</span>)}
        </BoxWrapper>
    );
};

export default Register;