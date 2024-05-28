import React, { useEffect, useState } from 'react';
import './employeeSidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

function EmployeeSidebar({ activeMenuItem }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initialize isMobile state based on initial viewport width
  const [Open, setOpen] = useState(false);
  const [employee, setEmployee] = useState({});
  const [username, setUsername] = useState('')

  const handleClick = () => {
    setOpen(!Open);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8080/jwt/decode', null, {
            params: { token: token },
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        const decodedToken = response.data.payload
        setUsername(decodedToken.sub);
        console.log(username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("username", username);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/jwt/get-employee",
          {
            params: {
              username: username,
            },
          }
        );
        setEmployee(response.data);
        console.log("employee", response.data);
      } catch (error) {
        // console.error("Error fetching user data:", error);
      }
    };

    fetchData();

  }, [username]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update isMobile state when viewport size changes
    };

    window.addEventListener('resize', handleResize); // Add resize event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remove event listener on component unmount
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className='employee-sidebar-button'>
          <Button sx={{ color: "black", marginLeft: "1%", marginTop: "10vh", marginBottom: "0rem", zIndex: "1000", width:'10%' ,position: "fixed" }} onClick={handleClick}><FaBars /></Button>
          {Open ?
            <div className={`employee-sidebar ${isMobile ? 'mobile' : ''}`}>
              <ul className="employee-sidebar-menu">
                <li className={activeMenuItem === "Home" ? "active" : ""}>
                  <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <Link to="/employee-dashboard">
                    Homepage
                  </Link>
                </li>
                {employee.isVerifier && (
                  <>
                    <li className={activeMenuItem === "Registration" ? "active" : ""}>
                      <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/orcr">
                        Verify OR/CR <br /> and License
                      </Link>
                    </li>
                    <li className={activeMenuItem === "Profile" ? "active" : ""}>
                      <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/verifypay">
                        Verify Proof <br /> of Payment
                      </Link>
                    </li>
                  </>
                )}

                {employee.isApprover && (
                  <>
                    <li className={activeMenuItem === "Payment" ? "active" : ""}>
                      <PaymentIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/approve">
                        Approve <br /> Applications
                      </Link>
                    </li>
                  </>
                )}
                
                {employee.isViewLogger && (
                <>
                  <li className={activeMenuItem === "Logs" ? "active" : ""}>
                    <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/view-logs">
                        View <br /> Logs
                      </Link>
                  </li>
                </>
              )}
                <li className={activeMenuItem === "Profile" ? "active" : ""}>
                  <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                  <Link to="/employee-profile">
                    Profile
                  </Link>
                </li>
              </ul>
            </div> : null}
        </div>
      ) : (
        <>
          <div className={`employee-sidebar ${isMobile ? 'mobile' : ''}`}>
            <ul className="employee-sidebar-menu">
              <li className={activeMenuItem === "Home" ? "active" : ""}>
                <HomeIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                <Link to="/employee-dashboard">
                  Dashboard
                </Link>
              </li>
              {employee.isVerifier && (
                <>
                  <li className={activeMenuItem === "Registration" ? "active" : ""}>
                    <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <Link to="/orcr">
                      Verify OR/CR <br /> and License
                    </Link>
                  </li>
                  <li className={activeMenuItem === "Profile" ? "active" : ""}>
                    <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                    <Link to="/verifypay">
                      Verify Proof <br /> of Payment
                    </Link>
                  </li>
                </>
              )}
              {employee.isApprover && (
                  <>
                    <li className={activeMenuItem === "Payment" ? "active" : ""}>
                      <PaymentIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/approve">
                        Approve <br /> Applications
                      </Link>
                    </li>
                  </>
                )}

              {employee.isViewLogger && (
                <>
                  <li className={activeMenuItem === "Logs" ? "active" : ""}>
                    <TaskIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                      <Link to="/view-logs">
                        View <br /> Logs
                      </Link>
                  </li>
                </>
              )}
              
              <li className={activeMenuItem === "Profile" ? "active" : ""}>
                <PersonIcon sx={{ color: "black", marginRight: "1.5rem" }} />
                <Link to="/employee-profile">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeSidebar;
