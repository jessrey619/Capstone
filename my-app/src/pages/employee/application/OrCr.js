import { Container, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import HP_background from '../../../assets/HP_Background.jpg';
import { useState, useEffect } from 'react';
import Header from '../../../components/Navbar/EmployeeHeader';
import Footer from '../../../components/Navbar/UserFooter';
import EmployeeSideBar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import axios from "axios";

export default function OrCr() {
    const isMobile = useMediaQuery('(max-width: 37.5rem)');
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/applicants/all");
                const filteredApplicants = response.data.filter(applicant => applicant.verified === false);
                setApplications(filteredApplicants);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleRowClick = (email) => {
        setSelectedEmail(email);
        navigate('/selectorcr', { state: { email } });
    };

    return (
        <>
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <EmployeeSideBar style={{ position: 'fixed', top: '4rem', left: 0, bottom: 0, zIndex: 500 }} />
                <div className='verifyPay' style={{
                    flex: 1,
                    paddingTop: '5rem', // Padding to create space for the fixed header
                    paddingLeft: '10%', // Padding to create space for the fixed sidebar
                    paddingBottom: '10rem', // Add padding to the bottom to create space for the footer
                    backgroundImage: `url(${HP_background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <br />
                                <Typography align="center" sx={{ fontWeight: 'bold', fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : '2rem' }}>Verify OR/CR and License</Typography>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                        <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem', padding: 'clamp(0.125rem, 1vw, 0.5rem)', backgroundColor: '#8A252C', borderRadius: '0.5rem 0 0 0', }}>
                                            <Typography style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'white' }}>New Registrations</Typography>
                                        </Paper>
                                    </div>
                                    <TableContainer component={Paper} sx={{ backgroundColor: '#D9D9D9', borderRadius: '0.5rem', height: 'clamp(20rem, 50vh, 30rem)', width: 'clamp(20rem, 70vw, 70rem)', position: 'relative' }}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Name</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Applicant Type</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date of Application</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {applications
                                                .filter(row => !row.rejected)
                                                .map((row) => {
                                                    const submittedDate = new Date(row.datesubmitted);
                                                    const month = submittedDate.toLocaleString('default', { month: 'long' });
                                                    const day = submittedDate.getDate();
                                                    const year = submittedDate.getFullYear();
                                                    const formattedDate = `${month} ${day}, ${year}`;

                                                    return (
                                                        <TableRow key={row.applicantid} sx={{ backgroundColor: '#EBEBEB', cursor: 'pointer' }} onClick={() => handleRowClick(row.email)}>
                                                            <TableCell align="center">{row.firstName} {row.middleInitial} {row.lastName}</TableCell>
                                                            <TableCell align="center">{row.isStaff ? 'Staff' : 'Student'}</TableCell>
                                                            <TableCell align="center">{formattedDate}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                            <Grid item xs={2}></Grid>
                        </Grid>
                    </Container>
                </div>
                <Footer style={{ zIndex: 1001 }} />
            </div>
        </>
    );
}
