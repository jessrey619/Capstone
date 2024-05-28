import React from 'react';
import { Link } from 'react-router-dom';
import './configOptions.css';

function configOptions() {
  return (
<div className="container">
      <Link to="/configuration/sticker-pricing" className="option">
        <div className="option-content">
          <i className="bi bi-tag-fill option-icon"></i>
          <h5>Sticker Pricing</h5>
        </div>
      </Link>
      <Link to="/configuration/parking-management" className="option">
        <div className="option-content">
          <i className="bi bi-car-front-fill option-icon"></i>
          <h5>Parking Management</h5>
        </div>
      </Link>
      <Link to="/configuration/user-management" className="option">
        <div className="option-content">
          <i className="bi bi-person option-icon"></i>
          <h5>User Management</h5>
        </div>
      </Link>
      <Link to="/configuration/account-expiration" className="option">
        <div className="option-content">
          <i className="bi bi-exclamation-triangle-fill option-icon"></i>
          <h5>Account Expiration</h5>
        </div>
      </Link>
    </div>
  )
}

export default configOptions