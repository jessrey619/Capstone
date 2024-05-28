import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './inputBoxes.css';

function InputBoxes({ labels, className, totalSpace, isActive, parkingAreaId, onTotalSpaceChange, onToggleActive, onSave }) {
  const [localTotalSpace, setLocalTotalSpace] = useState(totalSpace);
  const [localIsActive, setLocalIsActive] = useState(isActive);

  useEffect(() => {
    setLocalTotalSpace(totalSpace);
  }, [totalSpace]);

  useEffect(() => {
    setLocalIsActive(isActive);
  }, [isActive]);

  const handleTotalSpaceChange = (e) => {
    const value = e.target.value;
    setLocalTotalSpace(value);
    onTotalSpaceChange(parkingAreaId, value);
  };

  const handleToggleActive = () => {
    setLocalIsActive(!localIsActive);
    onToggleActive(parkingAreaId, localIsActive);
  };

  const handleSave = () => {
    onSave(parkingAreaId, localTotalSpace);
    Swal.fire({
      title: 'Success',
      text: 'Total space updated successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      setLocalTotalSpace('');
    });
  };

  return (
    <div className={className}>
      {labels && labels.map((label, index) => (
        <div className='data-input' key={index}>
          <label>{label}</label>
          <div className="input-save-container">
            <label className="toggle-switch">
              <input type="checkbox" checked={localIsActive} onChange={handleToggleActive} />
              <span className="slider"></span>
            </label>
            <input 
              type="number" 
              value={localTotalSpace} 
              onChange={handleTotalSpaceChange} 
              className="total-space-input"
            />
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InputBoxes;
