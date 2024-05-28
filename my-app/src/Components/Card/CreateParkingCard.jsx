import React, { useState } from 'react';
import './createParkingCard.css';

function CreateParkingCard({ onCreate }) {
  const [name, setName] = useState('');
  const [totalSpace, setTotalSpace] = useState('');
  const [allowCars, setAllowCars] = useState(false);
  const [allowMotorcycles, setAllowMotorcycles] = useState(false);

  const handleSave = () => {
    const newParkingArea = {
      name,
      totalSpace: parseInt(totalSpace, 10),
      allowCars,
      allowMotorcycles,
      isActive: false,
    };
    onCreate(newParkingArea);
  };

  return (
    <div className="input-container create-parking-card">
      <div className='data-input'>
        <label>Name of Area</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='data-input'>
        <label>Parking Capacity</label>
        <input type="number" value={totalSpace} onChange={(e) => setTotalSpace(e.target.value)} />
      </div>
      <div className="data-input checkbox-container">
        <label>
          <input type="checkbox" checked={allowCars} onChange={(e) => setAllowCars(e.target.checked)} /> Allow Cars
        </label>
        <label>
          <input type="checkbox" checked={allowMotorcycles} onChange={(e) => setAllowMotorcycles(e.target.checked)} /> Allow Motorcycles
        </label>
      </div>
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default CreateParkingCard;
