import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Error from './Components/Error';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthProvider from './UserContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
