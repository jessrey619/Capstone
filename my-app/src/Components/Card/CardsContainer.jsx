import React from 'react';
import Card from './Card';
import './card.css';

const CardsContainer = ({ cards }) => {
    return (
        <div className="card-container">
            {cards.map((card, index) => (
                <Card key={index} title={card.title} count={card.count} iconClass={card.iconClass} />
            ))}
        </div>
    );
};

export default CardsContainer;
