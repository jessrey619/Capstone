import { Box, Button, Container, Grid, Modal, Paper, Typography } from '@mui/material';
import backButton from '../../../assets/backButton.jpg';
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter';
import HP_background from '../../../assets/HP_Background.jpg';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import RejectModal from '../../../components/Modal/rejectModal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ProofPayment() {
    const location = useLocation();
    const email = location.state?.email;
    const [applications, setApplications] = useState({});
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
    const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');
    const [proofPhotoUrl, setProofPhotoUrl] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClosePhotoModal = () => {
        setIsPhotoModalOpen(false);
    };

    const handleVerifyClick = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/applicants/updatePaidStatus/${email}`);
            setMessage("Payment status updated successfully");
            setTimeout(() => {
                navigate('/verifypay');
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
    }, [email]);

    const fetchPhoto = async (photoType) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/photos/get-photo-by-name/${email}:${photoType}`,
                { responseType: 'arraybuffer' }
            );
            if (response.data) {
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                return url;
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
            return null;
        }
    };

    const handleOpenPhotoModal = (photoUrl) => {
        setCurrentPhotoUrl(photoUrl);
        setIsPhotoModalOpen(true);
    };

    const handlePaymentClick = async () => {
        const url = await fetchPhoto('proof_of_payment');
        if (url) {
            setProofPhotoUrl(url);
            handleOpenPhotoModal(url);
        }
    };

    return (
        <>
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0 }} />
                <div style={{
                    backgroundImage: `url(${HP_background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                }}>

                    <div>
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <br />
                                </Grid>

                                <Grid item xs={2}>
                                </Grid>
                                <Grid item xs={8} >
                                    <div style={{paddingTop:'10vh'}}>
                                        <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Grid item xs={1} sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <Link to="/verifypay" style={{ textDecoration: "none" }}> <img src={backButton} alt="Logo" style={{ width: "3rem", height: "3rem", }} /> </Link>
                                                    <h1 style={{ textAlign: "center", flex: 1 }}>Select Application</h1>
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
                                                            <div style={{fontWeight:'bold'}}>Application Name:</div>&nbsp;
                                                                <div style={{ textAlign: "left" }}>{applications.firstName} {applications.middleInitial}. {applications.lastName}
                                                            </div>
                                                        </div>
                                                    </Typography>
                                                    <Typography component="div" sx={{ }}>
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
                                                            <div style={{ textAlign: "left", fontWeight:'bold'  }}>Proof of Payment:</div>&nbsp;
                                                            <Button
                                                                onClick={handlePaymentClick}
                                                                sx={{ textTransform: "none", color: "#8A252C" }}>Click to View Image</Button>
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
                                                
                                                <RejectModal
                                                    open={isModalOpen}
                                                    handleClose={handleCloseModal}
                                                    email={applications.email}
                                                    rejectionType="proof"
                                                    onRejectSuccess={() => {
                                                        setMessage("Rejected successfully");
                                                        setIsModalOpen(false);
                                                        setTimeout(() => {
                                                            navigate('/verifypay');
                                                        }, 2000);
                                                    }}
                                                />
                                            </div>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <div>
                                                <Button sx={{
                                                    textTransform: "none",
                                                    color: "white",
                                                    backgroundColor: "Gold",
                                                    color:'black',
                                                    borderRadius: "5rem",
                                                    width: 'clamp(6rem, 10vw, 15rem)',
                                                    height: 'clamp(3rem, 4vh, 5rem)',
                                                    fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                                                }} onClick={handleVerifyClick}>Verify</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
                <Footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} />
            </div>
            <Modal open={isPhotoModalOpen} onClose={handleClosePhotoModal}>
                <Box sx={{ ...style, width: '90vw', height: '90vh', textAlign:'center' }}>
                    <img src={currentPhotoUrl} alt="Proof of Payment" style={{width:'90%', overflow:'scroll' }} />
                    <Button sx={{
                            textTransform: "none",
                            color: "white",
                            backgroundColor: "#8A252C",
                            borderRadius: "5rem",
                            width: 'clamp(6rem, 10vw, 15rem)',
                            height: 'clamp(3rem, 4vh, 5rem)',
                        fontSize: 'clamp(1rem, 1.5vw, 2rem)',
                    }} onClick={handleOpenModal}>Reject</Button>
                </Box>
            </Modal>
        </>
    );
}
