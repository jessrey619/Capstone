import React, { useEffect, useState } from 'react';
import TheHeader from '../../../Components/Header/UserHeader';
import TheFooter from '../../../Components/Footer/Footer';
import backgroundImage from '../../../assets/HP_Background.jpg';
import '../../../Components/Footer/Footer.css';
import './user_homepage.css';
import StudentSidebar from '../../../Components/StudentSidebar/StudentSidebar';
import UserAnnouncement from './announcement';
import UserProfilePage from '../user_profile/user_profile/user_profilepage';
import UserStatus from './UserStatus';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserHomepage = () => {
  // const { token } = useUser();
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  // const [decodedToken, setDecodedToken] = useState(null);


const token = localStorage.getItem('token');
const [decodedToken, setDecodedToken] = useState();



// // const email = decodedToken.payload.sub;
// console.log("decodedToken:",decodedToken.exp);
// // console.log("decodedToken:",decodedToken.payload);
// // console.log("decodedToken:",decodedToken.payload.sub);
// console.log("token:",token);




  useEffect(() => {
    // Prevent back button functionality
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/homepage"); // Navigate to homepage again
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);
  })
  
  useEffect(() => {
    sessionStorage.setItem('lastLocation', '/homepage'); // Store the homepage location in sessionStorage
  }, []);

  useEffect(() => {
    const decodeJwt = async () => {
      if (token) {
        try {
          const response = await axios.post('http://localhost:8080/jwt/decode', null, {
            params: { token: token },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const decoded = response.data.payload;
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('token');
        }
      }
    };

    decodeJwt();
  }, [token]);

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const renderComponent = () => {
    switch (activeMenuItem) {
      case "Home":
        return <UserAnnouncement />;
      case "Registration":
        return <UserStatus />;
      case "Profile":
        return <UserProfilePage />;
      default:
        return <UserAnnouncement />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='homepage' style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1 }}>
        <TheHeader />
      </div>

      <div className='student_sidebar'>
        <StudentSidebar activeMenuItem={activeMenuItem} onMenuItemClick={handleMenuItemClick} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}/>
      </div>
      <img src={backgroundImage} alt="backgroundImage" className='backgroundImage' />
      <div className="userHomepageContainer" >
        {renderComponent()}
      </div>

      <div style={{zIndex: 1 }}>
        <TheFooter />
      </div>
    </div>
  );
};

export default UserHomepage;
