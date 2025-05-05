import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  });
  
  const { handleUserRegister, error } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({...credentials, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await handleUserRegister(e, credentials);
      navigate('/'); // Redirect to home after successful registration
    } catch (error) {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field--wrapper">
            <label>Name:</label>
            <input 
              required
              type="text" 
              name="name"
              value={credentials.name}
              placeholder="Enter your name..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Email:</label>
            <input 
              required
              type="email" 
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Password:</label>
            <input 
              required
              type="password" 
              name="password1"
              placeholder="Enter a password (min 8 characters)"
              value={credentials.password1}
              onChange={handleInputChange}
              minLength="8"
            />
          </div>

          <div className="field--wrapper">
            <label>Confirm password:</label>
            <input 
              required
              type="password" 
              name="password2"
              placeholder="Confirm your password"
              value={credentials.password2}
              onChange={handleInputChange}
              minLength="8"
            />
          </div>

          <div className="field--wrapper">
            <input 
              className="btn btn--lg btn--main" 
              type="submit" 
              value="Register"
            />
          </div>
        </form>

        <p>Already have an account? Login <Link to="/login">here</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;