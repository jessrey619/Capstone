import React from 'react';
import InputBoxes from '../InputBoxes/InputBoxes';
import './createParkingCard.css';

function CreateParkingCard() {
  const labels = ['Name of Area', 'Parking Capacity']; 
  const className = 'create-parking-card'; 

  return (
    <div className={className}>
      <InputBoxes labels={labels} className="parking-capacity" includeCheckboxes={true} /> 
    </div>
  );
}

export default CreateParkingCard;
