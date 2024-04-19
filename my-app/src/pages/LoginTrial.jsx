// LoginTrial.jsx

import React from 'react';
import './LoginTrial.css';

const LoginTrial = () => {
  return (
    <div className="login-container">
      <div className="image-container">
      {/* <img src={require('./bckground.jpg')} alt="BackgroundImage" /> */}
      </div>
      <div className="form-container" style={{marginLeft:'60%', marginTop:'10%'}}>
        <form className="form">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input type="email" placeholder="Enter email" />
            <span></span>
          </div>
          <div className="input-container">
            <input type="password" placeholder="Enter password" />
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

export default LoginTrial;
