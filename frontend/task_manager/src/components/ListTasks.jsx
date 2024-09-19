import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';


const ListTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('fetching task list');
                const response = await axios.get('http://127.0.0.1:8000/list_tasks/');
                if (response.status === 200) {
                    console.log('success!!!');
                    console.log(response.data);
                    setTasks(response.data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }; fetchData();
     },[]);

     return (
        <>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.description}</li>
                ) )}
            </ul>
        </>
     );

};

export default ListTasks;