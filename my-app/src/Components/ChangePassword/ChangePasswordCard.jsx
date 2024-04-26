import React from 'react';
import './ChangePasswordCard.css';

function ChangePasswordCard () {
  return (
    <div className="change-password-container">
      <div className="form-container" >
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

export default ChangePasswordCard;
