import React, { useState } from 'react';
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import ConfigCards from '../../Components/Card/ConfigCard';
import StickerPricing from './StickerPricing';
import UserManagement from './UserManagement';
import ParkingManagement from './ParkingManagement';
import AccountExpiration from './AccountExpiration';

function Configuration() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const resetSelectedCard = () => {
    setSelectedCard(null);
  };

  return (
    <main id='main' className='main'>
      <PageTitle page="Configuration" />
      {selectedCard ? (
        renderSelectedPage(selectedCard, resetSelectedCard)
      ) : (
        <ConfigCards onCardSelect={handleCardSelect} />
      )}
    </main>
  );
}

function renderSelectedPage(selectedCard, resetSelectedCard) {
  switch (selectedCard) {
    case 'Sticker Pricing':
      return <StickerPricing resetSelectedCard={resetSelectedCard} />;
    case 'Parking Management':
      return <ParkingManagement resetSelectedCard={resetSelectedCard} />;
    case 'User Management':
      return <UserManagement resetSelectedCard={resetSelectedCard} />;
    case 'Account Expiration':
      return <AccountExpiration resetSelectedCard={resetSelectedCard} />;
    default:
      return null;
  }
}

export default Configuration;
