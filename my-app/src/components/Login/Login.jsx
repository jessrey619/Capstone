// Login.jsx

import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form">
          <p className="form-title">Login</p>
          <div className="input-container">
            <input type="email" placeholder="Username" className="input-field" />
            <span></span>
          </div>
          <div className="input-container">
            <input type="password" placeholder="Password" className="input-field" />
          </div>
          <button type="submit" className="submit">
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

export default Login;
