import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SvgIcon } from "@mui/material";

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                username: username,
                password: password,
            });
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            localStorage.setItem("username", username);
            navigate("/tasks");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="bg-red-200 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Log In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 rounded-md"
                />
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-md w-full pr-10"
                    />
                    <VisibilityIcon
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-2 cursor-pointer"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-red-300 text-black py-2 rounded hover:scale-105 duration-300"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};
export default LogIn;