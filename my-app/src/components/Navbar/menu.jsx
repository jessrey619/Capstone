import React, { useState } from 'react';
import './menu.css';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if(item==="Home"){
      navigate('/');
    } else{

    }
  };

  return (

    <>
      <div style={{ position: 'relative' }}>
        <button
          className='btn btn-primary dropdown-toggle'
          type='button'
          id='dropdownMenuButton1'
          data-mdb-toggle='dropdown'
          aria-expanded='false'
          style={{ backgroundColor: 'gold' }}
          onClick={toggleMenu}
        />

        {isOpen && (
          <div
            className='dropdown-menu'
            aria-labelledby='dropdownMenuButton1'
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              zIndex: 999,
              display: 'block',
            }}
          >
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li className='dropdown-item' onClick={() => handleItemClick('Home')}>
                Home
              </li>
              <li className='dropdown-item' onClick={() => handleItemClick('About Us')}>
                About Us
              </li>
            </ul>
          </div>
        )}
      </div>
    </>

    
  

  );
};

export default DropdownMenu;
