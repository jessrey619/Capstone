import React from 'react';
import './configCard.css';

function ConfigCards({ onCardSelect }) {
  const handleCardClick = (card) => {
    onCardSelect(card);
  };

  return (
    <div className="container">
      <div className="card" onClick={() => handleCardClick('Sticker Pricing')}>
        <div className="card-content">
          <i className="bi bi-tag-fill card-icon"></i>
          <h5>Sticker Pricing</h5>
        </div>
      </div>
      <div className="card" onClick={() => handleCardClick('Parking Management')}>
        <div className="card-content">
          <i className="bi bi-car-front-fill card-icon"></i>
          <h5>Parking Management</h5>
        </div>
      </div>
      <div className="card" onClick={() => handleCardClick('User Management')}>
        <div className="card-content">
          <i className="bi bi-person card-icon"></i>
          <h5>User Management</h5>
        </div>
      </div>
      <div className="card" onClick={() => handleCardClick('Account Expiration')}>
        <div className="card-content">
          <i className="bi bi-exclamation-triangle-fill card-icon"></i>
          <h5>Account Expiration</h5>
        </div>
      </div>
    </div>
  );
}

export default ConfigCards;
