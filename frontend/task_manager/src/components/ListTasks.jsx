import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';


const ListTasks = () => {
    const [tasks, setTasks] = useState([]);

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('fetching task list');
                const response = await axios.get('http://127.0.0.1:8000/list_tasks/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
            });
                if (response.status === 200) {
                    console.log('success!!!');
                    console.log(response.data);
                    setTasks(response.data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }; fetchData();
    }, []);

    const handleToggle = async (id, isCompleted) => {
        try {
            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks);

            if (!isCompleted) {
                await axios.delete(`http://127.0.0.1:8000/delete_task/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
            });
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            }
        } catch (error) {
            console.error('Error toggling or deleting the task:', error);
        }
    };


    return (
        <section className="bg-red-50 px-4 py-10">
            <div className="text-right"></div>
            <div className="container m-auto">
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <div key={task.id} className="p-4 bg-red-100 shadow-md rounded-lg border border-red-200">
                                {/* Task Details */}
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{task.title}</h2>
                                    <p className="text-gray-700 mb-2">{task.description}</p>
                                </div>

                                {/* Tags */}
                                {task.tag && task.tag.length > 0 ? (
                                    <div className="text-right mt-2">
                                        {task.tag.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-200 px-2 py-1 rounded-full text-sm ml-2"
                                                style={{ backgroundColor: tag.color }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-right mt-2">No tags</p>
                                )}
                                

                                <div className="text-right px-2 py-1 mt-2">
                                <div className="text-md font-bold mt-2 mb-1">Completed?</div>
                                    {/* Text Labels */}
                                    <span className={`text-sm font-semibold`}>
                                        No
                                    </span>

                                    {/* Toggle Slider */}
                                    <label className="relative inline-flex items-center mx-4">
        
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleToggle(task.id, task.completed)}
                                            className="sr-only"
                                        />
                                        <div className={`w-14 h-8 rounded-full bg-gray-200`}>
                                            <span
                                                className={`block w-8 h-8 rounded-full bg-red-300 transition-transform duration-300 ease-in-out
                    ${task.completed ? 'translate-x-6' : 'translate-x-0'}`}
                                            ></span>
                                        </div>
                                    </label>

                                    <span className={`text-sm font-semibold`}>
                                        Yes
                                    </span>
                                </div>
                            </div>
                            
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">No tasks available.</p>
                    )}
                </div>
            </div>
        </section>
    );

};

export default ListTasks;