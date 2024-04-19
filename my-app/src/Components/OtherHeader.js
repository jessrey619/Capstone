import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from '../responsive/menu';
import '../css/HeaderUser.css';

const TheHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 660);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check for mobile viewport width
    handleResize();

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;700&display=swap';

    // Append the link element to the document head
    document.head.appendChild(link);

    // Clean up function to remove the link when the component is unmounted
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className={`header ${isMobile ? 'mobile' : ''}`}>
      <div className="logo-container">
        <img src="/citu-logoSmall.png" alt="HeaderLogo" className="headerImage" />
      </div>
      <nav className="nav">
        {isMobile ? (
          <DropdownMenu/>
        ) : (
          <>
          <Link to="/Home">Home</Link> 
            <Link to="/AboutUs">About Us</Link> 
          </>
        )}
      </nav>
    </div>
  );
}

export default TheHeader;
