import React, { useState } from 'react';
import './LoginCard.css';
import axios from 'axios';


function LoginCard() {

  const [username, setUsername]= useState(null);
  const [password, setPassword]= useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    try {
      const response = await axios.post('http://localhost:8080/jwt/login', {
        username: username,
        password: password
      });
  
      // Handle the response here
      alert(response.status)
  
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
  }
  

  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form">
          <p className="form-title">Login</p>
          <div className="input-container">
            <input type="email" placeholder="Username" className="input-field" 
              onChange={handleUsernameChange}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" className="input-field" 
            onChange={handlePasswordChange}/>
          </div>
          <button type="submit" className="submit" onClick={handleSubmit}>
            Sign in
          </button>
          <p className="signup-link">
            No account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
