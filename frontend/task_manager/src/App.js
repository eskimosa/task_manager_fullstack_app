import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ListTasks from "./components/ListTasks";
import AddTask from "./components/AddTask";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
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
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/add-task' element={<AddTask addTaskSubmit={addTask}/>} />
        </Route>
      </Routes>
    </Router>
    
  );
};


export default App;
