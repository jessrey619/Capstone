import React from 'react'
import '../Components/Login/LoginBgm.css';
import LoginCard from '../Components/Login/LoginCard';

export default function LoginPage() {
  return (
    <main className='main-content'>
      <div className="image-container">
        <img src="../background.jpeg" alt="background2" className="bkg2" />
        <LoginCard/>
      </div>

    </main>
  )
}

