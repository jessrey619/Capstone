import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import backButton from '../../../assets/backButton.jpg';
import Header from '../../../components/Navbar/UserHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import RejectModal from '../../../components/Modal/rejectModal';


export default function AppChoice() {
    const [message, setMessage] = useState("");
    const location = useLocation();
    const email = location.state?.email;
    const [applications, setApplications] = useState({});
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


    const handleVerifyClick = async () => {
        console.log('handleVerifyClick called');
        try {
            const response = await axios.put(
                `http://localhost:8080/applicants/approveApplicant/${email}`);
            setMessage("Approval status updated successfully");
            
            console.log("DATA:",response.data);

            setTimeout(() => {
                navigate('/approve');
            }, 2000);
        } catch (error) {
            console.error('Error updating verification status:', error);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessage('');
        }, 3000);
        return () => clearTimeout(timeout);
    }, [message]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/applicants/get-by-email/" + email
                );
                if (response.data) {
                    console.log(response.data);
                    setApplications(response.data);
                    console.log('handleVerifyClick called', applications.verified);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='verifyPay' style={{
            backgroundImage: `url(${HP_background})`,
            backgroundSize: '100% 100%',
            minHeight: '100vh',
            fontSize: '16px', // Set base font size
        }}>
            <Header />
            <EmployeeSideBar />
            <Container maxWidth="lg">
                <Grid container spacing={2} sx={{minHeight:'85vh'}}>
                    <Grid item xs={12}>
                        <br />

                    </Grid>

                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8} >
                        <div style={{paddingTop:'10vh'}}>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Grid item xs={1} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }} >

                                </Grid>
                                <Grid item xs={10}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                    <Link to="/approve" style={{ textDecoration: "none" }}> <img src={backButton} alt="Logo" style={{ width: "3rem", height: "3rem",  }} /> </Link>
                                        <h1 style={{ textAlign: "center", fontSize: 'clamp(1.5rem, 5vw, 2rem)', flex: 1 }}>Select Application</h1>
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                </Grid>
                            </Grid>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Paper sx={{ width: 'clamp(25rem, 40vw, 100%)', height: 'clamp(20rem, 50vh, 100%)', borderRadius: '5rem 5rem 5rem 5rem', padding: '3rem', backgroundColor: 'rgba(228, 228, 228, 0.5)', }}>
                                    <div>
                                        <Typography component="div">
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold' }}>Application Name:</div>&nbsp;<div style={{ textAlign: "left" }}>{applications.firstName} {applications.middleInitial}. {applications.lastName}</div>
                                            </div>
                                        </Typography>
                                        <Typography component="div" sx={{}}>
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold'  }}>User Type:</div>&nbsp;<div>{applications.isStaff ? 'Staff' : 'Student'}</div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold'  }}>Affiliated ID Number:</div>&nbsp;<div style={{ textAlign: "left" }}>{applications.idNumber}</div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold'  }}>Address:</div>&nbsp;<div style={{ textAlign: "left" }}>{applications.address}</div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold'  }}>Contact Number:</div>&nbsp;<div style={{ textAlign: "left" }}>{applications.contactNumber}</div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", }}>
                                                <div style={{ textAlign: "left", fontWeight:'bold'}}>Status:</div>&nbsp;<div style={{ textTransform: "none", color: "#5E6600" }}>{applications.verified === true && applications.paid === true && applications.approved === false? "Fully Verified" : "Not Fully Verified"}</div>
                                            </div>
                                        </Typography>
                                    </div>
                                    <div style={{ color: 'red', textAlign: 'center', position: 'relative', top: '1rem' }}>
                                        {(message)}
                                    </div>
                                </Paper>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem", padding: "1rem" }}>
                                <div>
                                    <Button sx={{ textTransform: "none",
                                     color: "white",
                                      backgroundColor: "#8A252C",
                                      borderRadius: "5rem",
                                       width: 'clamp(10rem, 30vw, 13.25rem)',
                                        height: 'clamp(2rem, 10vh, 3.44rem)',
                                         fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
                                         
                                         onClick={handleOpenModal}>Reject</Button>
                                </div>
                                <RejectModal open={isModalOpen} handleClose={handleCloseModal} email={email} rejectionType='overall'/>
                                &nbsp;
                                <div>
                                    <Button sx={{ textTransform: "none",
                                     color: "black",
                                     backgroundColor: "#F4C522",
                                      borderRadius: "5rem",
                                       width: 'clamp(10rem, 30vw, 13.25rem)',
                                        height: 'clamp(2rem, 10vh, 3.44rem)',
                                         fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
                                         onClick={handleVerifyClick}>Approve</Button>
                                </div>
                            </div>
                        </div>

                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
            </Container>
            <div style={{zIndex:'99999'}}>
                <Footer />
            </div>
        </div>
    )
}
