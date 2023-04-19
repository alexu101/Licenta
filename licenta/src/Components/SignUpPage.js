import React from 'react'
import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel, Paper } from '@mui/material';
import { useState } from 'react';
import "./SignUpPage.css"
import { useSignup } from '../hooks/useSignUp';
import Navbar from './Navbar';

function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!checkPasswords())
            return
        await signup(email, password)
    }

    const checkPasswords = () => (password === passwordConfirmation)

    return (
        < div className='signupPage' >
            <Navbar />
            <img src={logo} alt="logo_image" className='logo' />
            <Paper elevation={10} className='paper'>
                <FormControl className='formControl' component="form" onSubmit={handleSubmit}>
                    <FormLabel id="formLabel">Sign-Up</FormLabel>
                    <TextField id="emailTextField" type='email' label="Email adress" variant='outlined' margin='normal' fullWidth onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <TextField id="passwordTextField" type='password' label="Password" variant='outlined' margin='normal' fullWidth onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    <TextField id="passwordConfirmationTextField" type='password' label="Password Confirmation" variant='outlined' margin='normal' fullWidth onChange={(e) => { setPasswordConfirmation(e.target.value) }} value={passwordConfirmation} error={!checkPasswords()} helperText={checkPasswords() ? "" : "Passwords do not match!"} />
                    <Button variant='contained' className='signupButton' type="submit" disabled={isLoading}>Sign-Up</Button>
                    <p>
                        By continuing, you agree to Dronazon's{' '}
                        <Link to="/terms&conditions" style={{ textDecoration: 'none' }}>Terms and conditions</Link>.
                    </p>
                    {error && <div className='error'>{error}</div>}
                </FormControl>
            </Paper>
            <Link to="/login" className='goToLogin'>LOG INTO YOUR ACCOUNT!</Link>
        </div >


    )
}

export default SignUpPage