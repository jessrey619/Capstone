import React from 'react';
import Card from './Card';
import './card.css';

const CardsContainer = ({ cards, onCardClick }) => {
    return (
        <div className="card-container">
            {cards.map((card, index) => (
                <Card 
                    key={index} 
                    title={card.title} 
                    count={card.count} 
                    iconClass={card.iconClass} 
                    onClick={() => onCardClick(card.title)}
                />
            ))}
        </div>
    );
};

export default CardsContainer;
