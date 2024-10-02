import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert('Passwords do not match');
            return;
        }
        console.log('Submitting sign-up form with data:', { username, email, password, password2 });
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/signup/', {
                username: username,
                password: password,
                password2: password2,
                email: email,
            });
            await axios.post('http://127.0.0.1:8000/auth/login/', {
                username: username,
                password: password,
        });

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem("username", username);

        setPassword('');
        setPassword2('');

        navigate('/tasks');
        } catch (error) {
            console.error(error.response.data);
        }
    };



    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded-md"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="p-2 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-red-300 text-black py-2 rounded hover:scale-105 duration-300"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};


export default SignUp;