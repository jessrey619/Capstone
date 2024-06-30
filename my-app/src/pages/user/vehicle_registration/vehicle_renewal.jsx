import React, { useEffect, useState } from 'react';
import Footer from "../../../components/Navbar/UserFooter";
import Header from "../../../components/Navbar/UserHeader";
import StudentSidebar from "../../../components/StudentSidebar/StudentSidebar";
import './vehicle_renewal.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Input, TextField, Typography } from '@mui/material';
import FileUpload from '../../vehicle_registration/uploadImage';
import axios from 'axios';

export default function RenewalForm() {
    const [changeVehicleData, setChangeVehicleData] = useState(false);
    const [changePersonalData, setChangePersonalData] = useState(false);
    const [orcr, setOrcr] = useState();
    const [license, setLicense] = useState();
    const token = localStorage.getItem('token');
    

    // Get email
    useEffect(() => {
        let email = '';
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
                email = decoded.sub;

            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
            }
            }
        };
    
        const getPastApplicationData = ()=>{
            
        };
        getPastApplicationData();
        decodeJwt();
    }, [token]);

    // For data here
    const [registrationData, setRegistrationData] = useState({
        surname: "",
        givenname: "",
        mi: "",
        sname: "",
        idno: "",
        yearlevel: "",
        contactno: "",
        vmake: "",
        plateno: "",
        color: "",
        isFourWheel: "",
        stickerType: "",
        address: "", // Add address field here
    });

    const [inputErrors, setInputErrors] = useState({
        surname: "",
        givenname: "",
        mi: "",
        sname: "",
        idno: "",
        yearlevel: "",
        contactno: "",
        vmake: "",
        plateno: "",
        color: "",
        isFourWheel: "",
    });


    const handleInputChange = ()=>{

    }




    // END OF FOR DATA

    const handleChangeVehicleDetailsCheckbox = (event) => {
        setChangeVehicleData(event.target.checked);
    };

    const handleChangePersonalDataCheckbox = (event) => {
        setChangePersonalData(event.target.checked);
    };

    return (
        <>
            <Header />
            <div className="renewal-page-middle-content">
                <div className="renewal-page-sidebar">
                    <StudentSidebar />
                </div>

                <div className="renewal-page-main-body">
                    <div className="renewal-page-form-background">
                        <div className="renewal-page-form-mainform">
                            <div className="renewal-page-checkboxes">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={changeVehicleData}
                                            onChange={handleChangeVehicleDetailsCheckbox}
                                        />
                                    }
                                    label="Change Vehicle Data"
                                />
                                
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={changePersonalData}
                                            onChange={handleChangePersonalDataCheckbox}
                                        />
                                    }
                                    label="Change Personal Data"
                                />
                                
                            </FormGroup>
                            </div>
                            {changePersonalData && (
                                <div className="renewal-page-form-personaldata">
                                    <Box sx={{ p: 2, alignItems: "center" }}>
                                    <Typography
                                        sx={{
                                        mb: 2,
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        fontSize: "1.5rem",
                                        }}
                                    >
                                        PERSONAL DATA
                                    </Typography>

                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            borderRadius: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                        >
                                        <div className="register-name-textfields" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                                            <div>
                                            <TextField
                                                variant="filled"
                                                label="Surname"
                                                value={registrationData.surname}
                                                name="surname"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.surname}
                                                
                                                sx={{ width: "100%" }}
                                                InputProps={{
                                                style: { backgroundColor: 'white' },
                                                }}
                                            />
                                            </div>
                                            <div>
                                            <TextField
                                                variant="filled"
                                                label="Given Name"
                                                value={registrationData.givenname}
                                                name="givenname"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.givenname}
                                                
                                                sx={{ width: "100%" }}
                                                InputProps={{
                                                style: { backgroundColor: 'white' },
                                                }}
                                            />
                                            </div>
                                            <div>
                                            <TextField
                                                variant="filled"
                                                label="M.I."
                                                value={registrationData.mi}
                                                name="mi"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.mi}
                                                
                                                sx={{ width: "100%" }}
                                                InputProps={{
                                                style: { backgroundColor: 'white' },
                                                }}
                                            />
                                            </div>
                                        </div>


                                        </div>

                                    </div>

                                    {/* Name of Students and ID Number */}
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            borderRadius: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                        >
                                        <div className="student-name-textfields" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                                            <div>
                                            <TextField
                                                variant="filled"
                                                label="Name of Student"
                                                value={registrationData.sname}
                                                name="sname"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.sname}
                                                disabled={true}
                                                sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
                                                InputProps={{
                                                style: { backgroundColor: 'white' },
                                                }}
                                            />
                                            </div>
                                            <div>
                                            <TextField
                                                variant="filled"
                                                label="ID Number"
                                                value={registrationData.idno}
                                                name="idno"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.idno}
                                                
                                                sx={{ flex: 1, marginBottom: "1rem" }}
                                                InputProps={{
                                                style: { backgroundColor: 'white' },
                                                }}
                                            />
                                            </div>

                                        </div>
                                        </div>
                                    </div>

                                    {/* Grade Year Level and Contact No */}
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            borderRadius: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                        >
                                        <div className="student-name-textfields" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                                        <div>
                                            <TextField
                                            variant="filled"
                                            label="Grade/Year Level"
                                            value={registrationData.yearlevel}
                                            name="yearlevel"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.yearlevel}
                                            
                                            sx={{ flex: 1, marginBottom: "1rem", marginRight: "1rem" }}
                                            InputProps={{
                                                style: { backgroundColor: 'white' },
                                            }}
                                            />
                                        </div>
                                        
                                        <div>
                                            <TextField
                                            variant="filled"
                                            label="Contact No"
                                            value={registrationData.contactno}
                                            name="contactno"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.contactno}
                                            
                                            sx={{ flex: 1, marginBottom: "1rem" }}
                                            InputProps={{
                                                style: { backgroundColor: 'white' },
                                            }}
                                            />
                                        </div>

                                        </div>
                                        
                                        
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            borderRadius: "1rem",
                                            marginBottom: "1rem",
                                        }}
                                        >
                                        <div className="address-textfields" style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                                        <div>
                                            <TextField
                                            variant="filled"
                                            label="Address"
                                            value={registrationData.address}
                                            name="address"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.address}
                                            
                                            sx={{ flex: 1, marginBottom: "1rem", width: "100%" }}
                                            InputProps={{
                                                style: { backgroundColor: 'white' },
                                            }}
                                            />
                                        </div>
                                        </div>
                                        
                                        
                                        </div>
                                    </div>
                                    </Box>
                                </div>
                            )}
                            
                            {changeVehicleData && (
                                <div className="renewal-page-form-vehicledata">
                                <h5>Vehicle Data</h5>
                                <TextField/>
                            </div>
                            )}

                            <div className='renewal-page-form-uploadfiles'>
                                <FileUpload label='ORCR' onChange={setOrcr}/>
                                <FileUpload label='License' onChange={setLicense}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
