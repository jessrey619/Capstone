import React, { useState, useEffect } from 'react';
import './UserFooter.css'; // Import your CSS file for styling
import LogoFooter from '../../assets/LogoFooter.png';
import FooterLogo from '../../assets/footer-logo.png';



const Footer = () => {

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
        // Create a link element
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
        <div className={`footer ${isMobile ? 'mobile' : ''}`} >
          <div className="logoContainer">
            <img src={FooterLogo} alt="FooterLogo"className='footerLogo'/>
          </div>
        
          <div className='info1'>
            <div className='cit-edu-contact-part'>
                <div className='this'>Contact Us</div>
                    <div style={{margin: 0, padding: 0}}>N. Bacalso Avenue, Cebu City, Philippines 6000</div>
                    <div style={{margin: 0, padding: 0}}>+63 32 411 2000 (trunkline)</div> 
                    <div style={{margin: 0, padding: 0}}>info@cit.edu</div>
            </div>
            <div className='info2'>
                <div className='title'>Quick Links</div>
                    <nav className="nav-footer">
                    <a href="https://cit.edu" style={{margin: 0, padding: 0}}>Cit.edu</a>
                    <a href="https://lair.education" style={{margin: 0, padding: 0}}>Lair</a>
                    <a href="https://cituweb.pinnacle.com.ph/aims/students/" style={{margin: 0, padding: 0}}>AIMS</a>
                    </nav>
            </div>
    
            </div>
        </div>
      );
    }
    
    export default Footer;