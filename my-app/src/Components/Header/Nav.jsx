import React from 'react';
import './nav.css';
import NavProfile from './NavProfile';

function Nav() {
  return (
    <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
            <NavProfile/>
        </ul>
    </nav>
  )
}

export default Nav