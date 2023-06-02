import React from 'react'
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Paper } from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import Navbar from './Navbar';

import "./LoginPage.css"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }
    return (
        <div className='loginPage'>
            <Navbar />
            <img src={logo} alt="logo_image" className='logo' />
            <Paper elevation={10} className='paper'>
                <FormControl className='formControl' component="form" onSubmit={handleSubmit}>
                    <FormLabel id="formLabel">Log-In</FormLabel>
                    <TextField id="emailTextField" type='email' label="Email adress" variant='outlined' margin='normal' fullWidth onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <TextField id="passwordTextField" type='password' label="Password" variant='outlined' margin='normal' fullWidth onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <Button variant='contained' className='loginButton' type='submit'>Login</Button>
                    <p>
                        By continuing, you agree to Dronazon's{' '}
                        <Link to="/terms&conditions" style={{ textDecoration: 'none' }}>Terms and conditions</Link>.
                    </p>
                    {error && <div className='error'>{error}</div>}
                </FormControl>
            </Paper>
            <Link to="/signup" className='createAccount'>CREATE AN ACCOUNT ON DRONAZON!</Link>
        </div>

    )
}


export default LoginPage