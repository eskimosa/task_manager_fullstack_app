import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
                                <NavLink to="/"
                                    className={linkClass}>Home</NavLink>
                                <NavLink to="/tasks"
                                    className={linkClass}>Tasks</NavLink>
                                <NavLink to="/add-task"
                                    className={linkClass}>Add Task</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;