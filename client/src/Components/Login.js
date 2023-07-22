import React, { useState } from 'react';
import '../Style/auth.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Login = () => {
  const { setIsAuthenticated } = useUser();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/login', formData);
    console.log(response.data); 

    if (response.data.status === 'success') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    console.error(error.response?.data || 'An error occurred during login.');
    setError('Invalid email or password.');
  }
};



  return (
    <div className='main-container'>
      <div className='auth-container'>
        <h1>Secure Hello World</h1>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='form-subcontainer'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              className='input-txt'
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-subcontainer'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='input-txt'
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='form-subcontainer'>
            <input type='submit' value='Login' className='submit-btn' />
          </div>
          {error && <p className='error-message'>{error}</p>} {/* Display error message */}
          <p>
            new to aarogram secure <Link to='/signup'><b>Signup</b></Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
