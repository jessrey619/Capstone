import React from 'react';
import './header.css';
import Logo from './Logo';
// import Logo from '../../assets/cit-logo.png';
import Nav from './Nav';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  }
  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
        <Logo/>
        <Nav/>
        <IconButton sx={{ ml: '2rem' }} onClick={handleLogout} >
                <LogoutIcon sx ={{ color: "black" }}/>
        </IconButton>
    </header>
  )
}

export default Header