import React, { useState } from 'react';
import '../Style/auth.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const Signup = () => {
  const { setIsAuthenticated } = useUser();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tc: false,
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log(response.data); 
      setIsAuthenticated(true);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='main-container'>
      <div className='auth-container'>
        <h1>Secure Hello World</h1>
        <form className='form-container' onSubmit={handleSubmit}>
          <div className='form-subcontainer'>
            <label htmlFor='name'>Enter name</label>
            <input
              type='text'
              id='name'
              name='name'
              className='input-txt'
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-subcontainer'>
            <label htmlFor='email'>Enter Email</label>
            <input
              type='text'
              id='email'
              name='email'
              className='input-txt'
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-subcontainer'>
            <label htmlFor='password'>Enter Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='input-txt'
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='form-subcontainer'>
            <label htmlFor='cpassword'>Confirm Password</label>
            <input
              type='password'
              id='cpassword'
              name='cpassword'
              className='input-txt'
              required
            />
          </div>
          <div className='form-subcontainer'>
            <input
              type='checkbox'
              id='option1'
              name='tc'
              value='Option 1'
              required
              checked={formData.tc}
              onChange={handleInputChange}
            />
            <label htmlFor='option1'>Accept terms and conditions</label>
          </div>
          <div className='form-subcontainer'>
            <input type='submit' value='Signup' className='submit-btn' />
          </div>
          <p>New to aarogram secure <Link to='/login'><b>Login</b></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
