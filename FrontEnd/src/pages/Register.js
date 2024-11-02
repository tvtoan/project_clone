import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from '../services/authService';
import styles from './Register.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventdefault();
        try {
            await authService.register(email, password);
            navigate('/login');
        } catch(error) {
            console.log('Register failed', error);0
        }
    }

    return(
        <div className= {cx('container')}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className= {cx('input')}
                />
                <input 
                    type = "password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className= {cx('input')}
                />
                <button type = "submit" className={cx('button')}>Register</button>
            </form>
        </div>
    )
}

export default Register;