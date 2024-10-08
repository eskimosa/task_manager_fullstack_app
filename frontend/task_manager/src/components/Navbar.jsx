import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await axios.post('http://127.0.0.1:8000/auth/logout/', {
                    refresh: refreshToken
                });
            }
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('username');

                navigate('/');
                // console.log(response.data);
            } catch (error) {
                console.error(error.response ? error.response.data : error.message);
                if (error.response && error.response.data.detail === "Token is invalid or expired") {
                    alert("Session expired, please log in again.");
                    // Redirect to the login page
                    navigate("/");
                } else {
                    console.error(error.response ? error.response.data : error.message);
                }
            }
        };

        const linkClass = ({ isActive }) =>
            isActive ? 'bg-red-400 text-black hover:bg-red-300 hover:text-black rounded-md px-3 py-2' : 'text-black hover:bg-red-300 hover:text-white rounded-md px-3 py-2';

        return (
            <nav className="bg-red-100 border-b border-red-200">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div
                            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
                        >
                            <div className="md:ml-auto">
                                <div className="flex space-x-2">
                                    {username && (
                                        <>
                                            <NavLink to="/tasks"
                                                className={linkClass}>Tasks</NavLink>
                                            <NavLink to="/add-task"
                                                className={linkClass}>Add Task</NavLink>
                                            <button
                                                onClick={handleLogout}
                                                className="text-black hover:bg-red-300 hover:text-white rounded-md px-3 py-2"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

    export default Navbar;