import React, { useState } from 'react';
import styles from './styles/Register.module.scss';

const Register = (props) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');

    const registerSubmit = () => {

    }
    return(
        <div>
            Register
            <div>
                <input className={styles.input} type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </div>
            <div>
                <input className={styles.input} type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
            </div>
            <div>
                <input className={styles.input} type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div onClick={() => registerSubmit() }>Submit</div>
        </div>
    );
};

export default Register;