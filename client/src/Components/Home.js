import React from 'react';
import '../Style/Home.css';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      window.location.href = '/login';
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p className='home-txt'>Hello World</p>
          <button className='home-btn' onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Please login to access the home page.<Link to="/login"><b>login</b></Link></h1>
      )}
    </div>
  );
};

export default Home;
