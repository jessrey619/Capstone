// ChangePassword.jsx

import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  return (
    <div className="change-password-container">
      <div className="form-container" style={{ marginLeft: '60%', marginTop: '10%' }}>
        <form className="form">
          <p className="form-title">Change Password</p>
          <div className="input-container">
            <input type="password" placeholder="Enter old password" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button type="submit" className="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
