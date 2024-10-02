import React from 'react';
import Hero from '../components/Hero';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [navigate]);

  return (
    <div className="bg-red-100 min-h-screen">
      <Hero />
    </div>
  );
}

export default HomePage;