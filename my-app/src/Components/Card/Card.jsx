import React from 'react';
import './card.css';

const Card = ({ title, count, iconClass }) => {
    return (
        <div className="card">
            <div className="card-content">
                <div>
                    <h5>{title}</h5>
                    <p>{count}</p>
                </div>
                <i className={`bi ${iconClass} card-icon`}></i>
            </div>
        </div>
    );
};

export default Card;