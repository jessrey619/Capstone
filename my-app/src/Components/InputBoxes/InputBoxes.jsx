import React from 'react';
import './inputBoxes.css';

function InputBoxes({ labels }) {
  return (
    <div className='input-container'>
      {labels.map((label, index) => (
        <div className='data-input' key={index}>
          <label>{label}</label>
          <input type="number" />
        </div>
      ))}
    </div>
  );
}

export default InputBoxes;
