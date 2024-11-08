import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {login} from '../../services/authService';
import styles from './Login.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response =await login(email, password);
            if(response && response.token) {
                localStorage.setItem("token", response.token);
            }
            navigate('/home');
        } catch (error) {
            setError(error.response ? error.response.data.message: "login failed, please try again.");
            console.log('Login failed', error);
        }
    }

    return (
        <div className= {cx('container')}>
            <h2>Login</h2>
            <form onSubmit={ handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={cx('input')}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={cx('input')}
                />
                <button type= "submit" className= {cx('button')}>Login</button>
            </form>

            {error && <div>{error}</div>}
        </div>
    )
    
}

export default Login;