import React from 'react'
import './logo.css'

function Logo() {
    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

  return (
    <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
            <img src="src\assets\cit-logo.png" alt="University Logo and Name" />
        </a>
        <i className='bi bi-list toggle-sidebar-btn'
            onClick={handleToggleSideBar}
            style={{ fontSize: '22px' }}>
        </i>
    </div>
  )
}

export default Logo