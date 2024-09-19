import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ListTasks from "./components/ListTasks";
import AddTask from "./components/AddTask";
import axios from "axios";


const App = () => {

  const addTask = async (newTask) => {
        try {
          await axios.post('http://localhost:8000/add_task/', newTask);
        } catch (error) {
          console.log('Error occured:', error);
        }
    };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListTasks />} />
        <Route path='/add_task' element={<AddTask addTaskSubmit={addTask}/>} />
      </Routes>
    </Router>
    
  );
};


export default App;
