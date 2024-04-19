import React from 'react'
import '../Components/Login/LoginBgm.css';
import Login from '../Components/Login/Login';

export default function LoginBgm() {
  return (
    <div className='main-content'>
      <div className="image-container">
      <img src="../background.jpeg" alt="background2" className="bkg2" />
      
    </div>
      <Login/>
    </div>
    
  )
}

