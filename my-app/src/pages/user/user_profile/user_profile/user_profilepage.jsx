import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import "./user_profilepage.css";
import ChangePassword from "./ChangePassword/ChangePassword";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const token = localStorage.getItem("token");
  const [decodedToken, setDecodedToken] = useState(null);
  const [username, setUserName] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [expiration, setExpiration] = useState({});
  const [vehicles, setVehicles] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [expirationDisplay, setExpirationDisplay] = useState('');
  const [applications, setApplications] = useState({})
  const [isActive, setIsActive] = useState(false)

  // Decoding Token
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
          setUserName(decoded.sub);
          setDecodedToken(decoded);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    decodeJwt();
  }, [token]);


  useEffect(() => {
    if (Object.keys(applications).length === 0) {
      setIsActive(false) ; // Not Active if No Applications
    }
    const currentDate = new Date();
    const expirationDate = new Date(applications.expirationDate);

    if(applications.approved === true){
      if (applications.rejected === true || expirationDate < currentDate) {
        setIsActive(false)
      }else{
        setIsActive(true)
      }
    } else{
      setIsActive(false)
    }
    console.log("this is for is active",isActive)
  },[applications]);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8080/jwt/get-user', {
          params: {
            username: username
          }
        });
        setUser(userResponse.data);

        const expirationResponse = await axios.get('http://localhost:8080/config/get-expiration');
        setExpiration(expirationResponse.data);

        const vehiclesResponse = await axios.get('http://localhost:8080/vehicles/find-by-username/'+username);
        setVehicles(vehiclesResponse.data);

        const applicationResponse = await axios.get('http://localhost:8080/applicants/get-by-email/'+username);
        setApplications(applicationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);


  useEffect(() => {
    const fetchData = async () => {
      if(vehicles.isStaff){
        setExpirationDisplay(expiration.staffExpirationDate);
      } else{
        setExpirationDisplay(expiration.studentExpirationDate);
      }
    };
    if (username) {
      fetchData();
    }
  },[vehicles])

  return (
    <div style={{width:'70vw'}}>
      {/* Main Content */}
      <div className="user-profile-container">
        <div className="profile-logout-btn" style={{ textAlign: 'right', marginBottom: '1.5%', marginTop: '2%' }}>
          <button onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
        <Box className="user-profile-outer">
          <Box className="user-profile-box user-profile-main" sx={{ boxShadow: 3, width:'80%',}}>
            <div className="user-profile-status">
              <div className="user-profile-avatar">
                <Avatar sx={{ bgcolor: "purple" }}>S</Avatar>
                <div className="user-profile-name">
                  <label>Name</label>
                  <span>{`${user.fname} ${user.mname} ${user.lname}`}</span>
                  <label>Sticker No: {vehicles.stickerId === 0 ? 'N/A' : vehicles.stickerId}</label>
                </div>
              </div>
              <Typography color={applications.approved ? "green" : "red"}>{applications.approved ? "ACTIVE" : "INACTIVE"}</Typography>
            </div>

            <hr />

            <div className="user-profile-details">
              <div className="user-profile-detail">
                <label>Expiration Date</label>
                <span>{isActive? formatDate(expirationDisplay):'N/A'}</span>
                <span>{isActive? "S.Y. "+expiration.schoolYear : 'N/A'}</span>
              </div>
              <div className="user-profile-detail">
                <label>Registration Type</label>
                <span>
                  {isActive?(vehicles?.isFourWheel !== null && vehicles?.isFourWheel !== undefined
                    ? (vehicles.isFourWheel ? "4-Wheel Vehicle" : "2-Wheel Vehicle")
                    : ''):'N/A'}
                </span>
                <span>
                  {isActive?(vehicles?.isParking !== null && vehicles?.isParking !== undefined
                    ? (vehicles.isParking ? "Parking" : "Pick-up/Drop-off")
                    : ''):'N/A'}
                </span>
              </div>
              <div className="user-profile-detail">
                <label>Vehicle Type</label>
                <span>{isActive? vehicles.vehicleMake:'N/A'}</span>
                <span>{isActive? vehicles.plateNo:'N/A'}</span>
              </div>
            </div>
          </Box>

          <Box className="user-profile-box user-profile-email" sx={{ boxShadow: 3, width:'80%', overflow:'scroll'}}>
            <label>Email</label>
            <span>{username}</span>
          </Box>
          <Box className="user-profile-box user-profile-number" sx={{ boxShadow: 3, width:'80%', overflow:'scroll'}}>
            <label>Phone Number</label>
            <span>{isActive?user.contactNumber:'N/A'}</span>
          </Box>
          <Box className="user-profile-box user-profile-address" sx={{ boxShadow: 3, width:'80%', overflow:'scroll'}}>
            <label>Address</label>
            <span>{isActive?user.address:'N/A'}</span>
          </Box>
          {showChangePassword ? (
            <ChangePassword setShowChangePassword={setShowChangePassword} />
          ) : (
            <div className="user-profile-box-user-profile-changepass">
              <Button sx={{ color: 'white', backgroundColor: 'green' }} onClick={() => setShowChangePassword(true)}>
                Change Password
              </Button>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};

export default UserProfilePage;
