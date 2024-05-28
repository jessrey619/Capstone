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
    <div>
      <button onClick={toggleMenu}>
        <img src={"/dropMenu.svg"} alt="Menu" className='imgMenu' />
      </button>
      {isOpen && (
        <div className="dropdown-menu" style={{  position: 'fixed'}}>
          <ul>
            <li style={{ top:'5vh' }} onClick={() => handleItemClick('Home')}>Home</li>
            <li style={{ top:'8vh' }}onClick={() => handleItemClick('About Us')}>About Us</li>
          </ul>
        </div>
      )}
    </div>

  );
};

export default DropdownMenu;
