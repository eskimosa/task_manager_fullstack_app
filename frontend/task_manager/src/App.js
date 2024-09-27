import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import ListTasks from "./components/ListTasks";
import AddTask from "./components/AddTask";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import axios from "axios";
import PrivateRoute from "./routes/PrivateRoute";


const App = () => {

  const addTask = async (newTask) => {
    const token = localStorage.getItem('access_token');

    try {
      await axios.post('http://localhost:8000/add_task/', newTask, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log('Error occured:', error);
    }
  };

  return (
    <Router>
      <MainLayout />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tasks'element={<PrivateRoute><TasksPage /></PrivateRoute>}/>
        <Route path='/add-task' element={<PrivateRoute><AddTask addTaskSubmit={addTask} /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

export default App;
