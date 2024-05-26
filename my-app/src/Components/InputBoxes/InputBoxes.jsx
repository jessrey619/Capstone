import React, { useState } from 'react';
import axios from 'axios';
import './inputBoxes.css';

function InputBoxes({ labels, className, includeCheckboxes, totalSpace, onSave, parkingAreaId }) {

  const [toggleStates, setToggleStates] = useState(labels.map(() => false));

  const toggleSwitch = (index) => {
    setToggleStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };


  const handleSave = () => {
    const updatedData = {
      totalSpace: totalSpace,
      isActive: toggleStates[labels.findIndex(label => label === 'Is Active')],
    };

    axios.put(`/parking/${parkingAreaId}`, updatedData)
      .then(response => {
        console.log(response.data);
        onSave(); 
      })
      .catch(error => {
        console.error('Error updating parking area:', error);

      });
  };

  return (
    <div className={`input-container ${className}`}>
      {labels.map((label, index) => (
        <div className='data-input' key={index}>
          <label>{label}</label>
          {label.includes('Parking Area') && (
            <label className="toggle-switch">
              <input type="checkbox" checked={toggleStates[index]} onChange={() => toggleSwitch(index)} />
              <span className="slider"></span>
            </label>
          )}
          {label !== 'Name of Parking Area' && <input type="number" />} 
        </div>
      ))}
      {includeCheckboxes && (
        <div className="data-input checkbox-container">
          <label>
            <input type="checkbox" /> Allow Cars
          </label>
          <label>
            <input type="checkbox" /> Allow Motorcycles
          </label>
        </div>
      )}
      <button className="save-button" onClick={handleSave}>Save</button>
    </div>
  );
}

export default InputBoxes;
