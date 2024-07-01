import React, { useEffect, useState } from 'react';
import Footer from "../../../components/Navbar/UserFooter";
import Header from "../../../components/Navbar/UserHeader";
import StudentSidebar from "../../../components/StudentSidebar/StudentSidebar";
import './vehicle_renewal.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Backdrop, Box, CircularProgress, Input, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material';
import FileUpload from '../../vehicle_registration/uploadImage';
import axios from 'axios';
import ModalComponent from './SuccessModal';
import { Button } from 'bootstrap';

export default function RenewalForm() {
    const [changeVehicleData, setChangeVehicleData] = useState(false);
    const [changePersonalData, setChangePersonalData] = useState(false);
    const [orcr, setOrcr] = useState();
    const [license, setLicense] = useState();
    const token = localStorage.getItem('token');
    const [pastApplicationData, setPastApplicationData] = useState(null);
    const [email, setEmail] = useState('')
    const [color, setColor] = useState('');

    // Open Modal
    const [modalOpen, setModalOpen] = useState(false);

    // decoded Token
    const [decodedToken, setDecodedToken] = useState({});

    // Snackbar variables
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      };

    // Loading variables
    const [loading,setLoading] = useState(false);
    
    // For the parking radio if ever full
    const [parkingIsActive, setParkingIsActive] = useState(true)
    const [expiration, setExpiration] = useState({})
    const [numberOfParkingApplicants, setNumberOfParkingApplicants] = useState(0)

    // Get eXpiration
    useEffect(() => {
        axios.get('http://localhost:8080/config/get-expiration')
            .then((response) => {
                // Filter for applications where isParking === true
                // console.log("expiration useEffects", response.data)
                setExpiration(response.data)
            })
            .catch((error) => {
                // Handle error
                console.error('Error:', error);
            });
    },[]);

    // Get all application data
    useEffect(() => {
        axios.get('http://localhost:8080/applicants/all')
            .then((response) => {
            // Filter for applications where isParking === true
            const parkingApplications = response.data.filter(app => app.isParking === true);
    
            // Filter parking applicants whose expiration dates coincide with either staff or student expiration
            // console.log("expiration",expiration)
            const coincidingExpirations = parkingApplications.filter(app => {
                const expirationDate = new Date(app.expirationDate);
                if (app.isStaff === true) {
                // console.log("numberOfIsStaff",new Date(expiration.staffExpirationDate).getTime())
                return expirationDate.getTime() === new Date(expiration.staffExpirationDate).getTime();
                
                } else {
                // console.log("Global Expiration",expirationDate.getTime())
                // console.log("Application Expiration", expiration.staffExpirationDate)
                return expirationDate.getTime() === new Date(expiration.studentExpirationDate).getTime();
                }
            });
            // console.log("numberOfYes",coincidingExpirations.length)
            // Set the number of parking applicants with coinciding expiration dates
            setNumberOfParkingApplicants(coincidingExpirations.length);
            })
            .catch((error) => {
            // Handle error
            console.error('Error:', error);
            });
    }, [expiration]);

    // Get email and get past application data
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
                    setEmail(decoded.sub);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    localStorage.removeItem('token');
                }
            }
        };

        const getPastApplicationData = async (email) => {
            try {
                const response = await axios.get(`http://localhost:8080/applicants/last-approved/${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setPastApplicationData(response.data);
                setRegistrationData({
                    surname: response.data.lastName,
                    givenname: response.data.firstName,
                    mi: response.data.middleInitial,
                    sname: `${response.data.lastName} ${response.data.firstName} ${response.data.middleInitial}.`,
                    idno: response.data.idNumber,
                    yearlevel: response.data.gradeLevel,
                    contactno: response.data.contactNumber,
                    vmake: response.data.vehicleMake,
                    plateno: response.data.plateNo,
                    color: response.data.color,
                    isFourWheel: response.data.vehicleType ,
                    stickerType: response.data.isParking  ,
                    address: response.data.address,
                    color: response.data.color
                });
            } catch (error) {
                console.error('Error fetching past application data:', error);
            }
        };

        decodeJwt();
        if (email) {
            getPastApplicationData(email);
        }
    }, [token, email]);

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

    // For Vehicle data
    const [stickerType, setStickerType] = useState('');
    const handleStickerChange = (e) => {
        const { value } = e.target;
        const isParking = value === "true";
        setRegistrationData((prevData) => ({
            ...prevData,
            stickerType: isParking,
        }));
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(name, value, registrationData);
    };

    // END OF FOR DATA

    const handleChangeVehicleDetailsCheckbox = (event) => {
        setChangeVehicleData(event.target.checked);
    };

    const handleChangePersonalDataCheckbox = (event) => {
        setChangePersonalData(event.target.checked);
    };

    // FORM VALIDATION
    const validateForm = () => {
        const errors = {};
    
        // Validate Surname
        if (!registrationData.surname.trim()) {
          errors.surname = "Surname is required";
        } else if (!/^[a-zA-Z\s]+$/.test(registrationData.surname)) {
          errors.surname = "Surname must contain only letters and spaces";
        }
    
        // Validate Given Name
        if (!registrationData.givenname.trim()) {
          errors.givenname = "Given Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(registrationData.givenname)) {
          errors.givenname = "Given Name must contain only letters and spaces";
        }
    
        // Validate M.I.
        if (!registrationData.mi.trim()) {
          errors.mi = "M.I. is required";
        } else if (!/^[a-zA-Z]+$/.test(registrationData.mi)) {
          errors.mi = "M.I. must contain only letters";
        }
    
        // Validate Name of Student
        if (!registrationData.sname.trim()) {
          errors.sname = "Name of Student is required";
        } else if (!/^[a-zA-Z\s.]+$/.test(registrationData.sname)) {
          errors.sname =
            "Name of Student must contain only letters, spaces, and periods";
        }
    
        // Validate ID Number
        if (
          !registrationData.idno.trim() ||
          !/^\d*(-\d*)*$/.test(registrationData.idno)
        ) {
          errors.idno = "ID Number must only contain digits and dashes";
        }
    
        // Validate Grade/Year Level
        if (!registrationData.yearlevel.trim()) {
          errors.yearlevel = "Grade/Year Level is required";
        }
    
        // Validate Contact Number
        if (
          !registrationData.contactno.trim() ||
          !/^(09|\+639)\d{9}$/.test(registrationData.contactno)
        ) {
          errors.contactno = "Contact number must be in the format 09123456789";
        }
    
        // Validate Vehicle Make
        if (!registrationData.vmake.trim()) {
          errors.vmake = "Vehicle Make is required";
        }
    
        // Validate Plate No
        if (!registrationData.plateno.trim()) {
          errors.plateno = "Plate No is required";
        }
    
        // Validate Color
        if (!registrationData.color.trim()) {
          errors.color = "Color is required";
        }
    
        // Validate Address
        if (!registrationData.address.trim()) {
          errors.address = "Address is required";
        }
    
        // Validate Vehicle Type
        if (registrationData.isFourWheel === "") {
          errors.isFourWheel = "Vehicle Type is required";
        }
        if (registrationData.stickerType === "") {
          errors.stickerType = "Sticker Type is required";
        }
    
        setInputErrors(errors);
        return Object.keys(errors);
      };

    // HANDLE SUBMIT
    const handleSubmit = async () => {
        // Validate the form
        const invalidFields = validateForm();
    
        // Check if there are any validation errors
        if (invalidFields.length > 0 || !orcr || !license) {
          // If there are validation errors or if OR/CR or License files are missing
          let errorMessage = "";
    
          // Check if OR/CR file is missing
          if (!orcr) {
            errorMessage = "Please upload OR/CR file.";
          }
    
          // Check if License file is missing
          if (!license) {
            errorMessage += " Please upload License file.";
          }
    
          // Display validation error message if any
          if (invalidFields.length > 0) {
            errorMessage += ` Please fill in all required fields and correct the following: ${invalidFields.join(
              ", "
            )}`;
          }
    
          // Display error message in Snackbar
          setSnackbarMessage(errorMessage);
          setSnackbarOpen(true);
    
          // Exit the function early
          return;
        }
    
        setLoading(true); // Show loader while waiting for submission
    
        try {
          // Submit data to the server
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const lastName = registrationData.surname;
          const firstName = registrationData.givenname;
          const middleInitial = registrationData.mi;
          const studentName = registrationData.sname;
          const idNumber = registrationData.idno;
          const gradeLevel = registrationData.yearlevel;
          const contactNumber = registrationData.contactno;
          const vehicleMake = registrationData.vmake;
          const address = registrationData.address;
          const plateNo = registrationData.plateno;
          const color = registrationData.color;
          const isFourWheel = registrationData.isFourWheel;
          const email = decodedToken.sub;
          const isStaff = pastApplicationData.isStaff;
          const stickerType = registrationData.stickerType;
          // Submit applicant registration data
          const res = await axios.post(
            "http://localhost:8080/applicants/renew",
            {
              email: email,
              firstName: firstName,
              lastName: lastName,
              middleInitial: middleInitial,
              studentName: studentName,
              address: address,
              idNumber: idNumber,
              gradeLevel: gradeLevel,
              contactNumber: contactNumber,
              vehicleMake: vehicleMake,
              address: address,
              isStaff: isStaff,
              plateNo: plateNo,
              color: color,
    
              vehicleMake: vehicleMake,
              plateNo: plateNo,
              color: color,
              isParking: stickerType,
              vehicleType: isFourWheel,
            },
            config
          );
    
          // Upload OR/CR and License files
          const formData = new FormData();
          formData.append("file", orcr);
          formData.append("name", email+":orcr");
          formData.append("username", email);
          formData.append("type", 1);
    
          const formData2 = new FormData();
          formData2.append("file", license);
          formData2.append("name", email+":license");
          formData2.append("username", email);
          formData2.append("type", 2);
    
          const config2 = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          };
    
          const res2 = await axios.post(
            "http://localhost:8080/photos/upload",
            formData,
            config2
          );
          const res3 = await axios.post(
            "http://localhost:8080/photos/upload",
            formData2,
            config2
          );
    
          console.log("Response 1:", res);
          console.log("Response 2:", res2);
          console.log("Response 3:", res3);
          // If both requests are successful, show success message
          if (res.status === 200 && res2.status === 200 && res3.status === 200) {
            setSnackbarMessage("Registration successful");
            setSnackbarOpen(true);
            setModalOpen(true); 
          } else {
            // If any request fails, show error message
            setSnackbarMessage(
              "An error occurred during registration. Please try again later."
            );
            setSnackbarOpen(true);
          }
        } catch (error) {
          // Handle any errors that occur during submission
          setSnackbarMessage(
            "An error occurred during registration. Please try again later."
          );
          setSnackbarOpen(true);
        } finally {
          setLoading(false); // Hide loader after submission
        }
      };
    return (
        <>
            <Header />
            <div className="renewal-page-middle-content">
                {/* <div className="renewal-page-sidebar" style={{zIndex:'1'}}>
                    <StudentSidebar />
                </div> */}

                <div className="renewal-page-main-body">
                    <h2>Renewal Form</h2>
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

                                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {/* Surname, Given Name, M.I. */}
                                    <Box  sx={{ display: "flex", flexWrap: "wrap" }}>
                                    <div className='vehicle-renewal-name-container'>
                                        <div className='vehicle-renewal-name-subcontainer'>
                                        <TextField
                                            className="optimized-textfield"
                                            variant="filled"
                                            label="Surname"
                                            value={pastApplicationData.lastName}
                                            name="surname"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.surname}
                                            disabled
                                            fullWidth
                                            InputProps={{ style: { backgroundColor: 'white', width:'100%' } }}
                                        />
                                        </div>
                                            
                                        <div className='vehicle-renewal-name-subcontainer'>
                                            <TextField
                                                className="optimized-textfield"
                                                variant="filled"
                                                label="Given Name"
                                                value={pastApplicationData.firstName}
                                                name="givenname"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.givenname}
                                                disabled
                                                fullWidth
                                                InputProps={{ style: { backgroundColor: 'white' , width:'100%'} }}
                                            />
                                        </div>
                                        
                                        <div className='vehicle-renewal-name-subcontainer'>
                                            <TextField
                                                className="optimized-textfield"
                                                variant="filled"
                                                label="M.I."
                                                value={pastApplicationData.middleInitial}
                                                name="mi"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.mi}
                                                disabled
                                                fullWidth
                                                InputProps={{ style: { backgroundColor: 'white', width:'100%' } }}
                                            />
                                        </div>
                                    </div>
                                    
                                    
                                    </Box>

                                    {/* Name of Student and ID Number */}
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                        <div className='vehicle-renewal-studentinfo-container'>
                                            <div className='vehicle-renewal-studentinfo-subcontainer'>
                                                <TextField
                                                    className="optimized-textfield"
                                                    variant="filled"
                                                    label="Name of Student"
                                                    value={`${pastApplicationData.lastName} ${pastApplicationData.firstName} ${pastApplicationData.middleInitial}`}
                                                    name="sname"
                                                    onChange={handleInputChange}
                                                    error={!!inputErrors.sname}
                                                    disabled
                                                    fullWidth
                                                    InputProps={{ style: { backgroundColor: 'white' } }}
                                                />
                                            </div>
                                            <div className='vehicle-renewal-studentinfo-subcontainer'>
                                                <TextField
                                                    className="optimized-textfield"
                                                    variant="filled"
                                                    label="ID Number"
                                                    value={pastApplicationData.idNumber}
                                                    name="idno"
                                                    onChange={handleInputChange}
                                                    error={!!inputErrors.idno}
                                                    disabled
                                                    fullWidth
                                                    InputProps={{ style: { backgroundColor: 'white' } }}
                                                />
                                            </div>
                                        </div>
                                   
                                    
                                    </Box>

                                    {/* Grade/Year Level and Contact No */}
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                    <div className='vehicle-renewal-studentinfo-container'>
                                            <div className='vehicle-renewal-studentinfo-subcontainer'>
                                            <TextField
                                                className="optimized-textfield"
                                                variant="filled"
                                                label="Grade/Year Level"
                                                value={registrationData.yearlevel}
                                                name="yearlevel"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.yearlevel}
                                                fullWidth
                                                InputProps={{ style: { backgroundColor: 'white' } }}
                                            />
                                            </div>
                                            <div className='vehicle-renewal-studentinfo-subcontainer'>
                                            <TextField
                                                className="optimized-textfield"
                                                variant="filled"
                                                label="Contact No"
                                                value={registrationData.contactno}
                                                name="contactno"
                                                onChange={handleInputChange}
                                                error={!!inputErrors.contactno}
                                                fullWidth
                                                InputProps={{ style: { backgroundColor: 'white' } }}
                                            />
                                            </div>
                                        </div>
                                    
                                    
                                    </Box>

                                    {/* Address */}
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                    <div className='vehicle-renewal-studentinfo-container'>
                                        <div className='vehicle-renewal-address-subcontainer'>
                                        <TextField
                                            className="optimized-textfield"
                                            variant="filled"
                                            label="Address"
                                            value={pastApplicationData.address}
                                            name="address"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.address}
                                            disabled
                                            fullWidth
                                            InputProps={{ style: { backgroundColor: 'white' } }}
                                        />
                                        </div>
                                        
                                    </div>
                                    
                                    </Box>
                                </Box>
                                </Box>
                            </div>
                            )}

                            
                            {changeVehicleData && (
                            <div className="renewal-page-form-personaldata">
                                
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", p:2 }}>
                                <Typography
                                    sx={{
                                    mb: 2,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: "1.5rem",
                                    }}
                                >
                                    VEHICLE DATA
                                </Typography>
                                {/* Vehicle Make, Plate No., Color */}
                                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                                <div className="vehicle-renewal-name-container">
                                    <div className='vehicle-renewal-name-subcontainer'>
                                        <TextField
                                            className="optimized-textfield"
                                            variant="filled"
                                            label="Vehicle Make"
                                            value={pastApplicationData.vehicleMake}
                                            name="vmake"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.vmake}
                                            disabled
                                            fullWidth
                                            InputProps={{ style: { backgroundColor: 'white' } }}
                                            sx={{ flex: 2, marginRight: "1rem" }}
                                        />
                                    </div>
                                    <div className='vehicle-renewal-name-subcontainer'>
                                        <TextField
                                            className="optimized-textfield"
                                            variant="filled"
                                            label="Plate Number"
                                            value={pastApplicationData.plateNo}
                                            name="plateno"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.plateno}
                                            disabled
                                            fullWidth
                                            InputProps={{ style: { backgroundColor: 'white' } }}
                                            sx={{ flex: 1, marginRight: "1rem" }}
                                        />
                                    </div>
                                    <div className='vehicle-renewal-name-subcontainer'>
                                        <TextField
                                            className="optimized-textfield"
                                            variant="filled"
                                            label="Vehicle Color"
                                            value={registrationData.color}
                                            name="color"
                                            onChange={handleInputChange}
                                            error={!!inputErrors.color}
                                            fullWidth
                                            InputProps={{ style: { backgroundColor: 'white' } }}
                                            sx={{ flex: 1 }}
                                        />
                                    </div>
                                    
                                    
                                </div>
                                </Box>

                                {/* Vehicle Type */}
                                <div className='vehicle-renewal-radio-group-container'>
                                    <div className='vehicle-renewal-vehicle-type-radio-group'>
                                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                                            <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: "1rem" }}>
                                            Vehicle Type:
                                            </Typography>
                                            
                                            <RadioGroup
                                                name="isFourWheel"
                                                value={pastApplicationData.isFourWheel ? "true" : "false"}
                                                sx={{ flexDirection: "row" }}
                                            >
                                                

                                                <FormControlLabel
                                                    value="false"
                                                    control={<Radio disabled />}
                                                    label="2 Wheeler"
                                                />
                                                
                                                
                                                <FormControlLabel
                                                    value="true"
                                                    control={<Radio disabled />}
                                                    label="4 Wheeler"
                                                />
                                            </RadioGroup>
                                        </Box>
                                    </div>

                                    {/* Sticker Type */}
                                    <div className='vehicle-renewal-vehicle-type-radio-group'>
                                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                                            <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: "1rem" }}>
                                            Sticker Type:
                                            </Typography>
                                            <RadioGroup
                                            name="stickerType"
                                            value={registrationData.stickerType ? 'true' : 'false'}
                                            onChange={handleStickerChange}
                                            sx={{ flexDirection: "row" }}
                                            >
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio />}
                                                label="Drop-off"
                                            />
                                            {parkingIsActive ? (
                                                <FormControlLabel
                                                value="true"
                                                control={<Radio />}
                                                label="Parking"
                                                />
                                            ) : (
                                                <FormControlLabel
                                                value="true"
                                                control={<Radio disabled />}
                                                label="Parking (Unavailable)"
                                                />
                                            )}
                                            </RadioGroup>
                                        </Box>
                                    </div>
                                    
                                </div>
                                </Box>
                            </div>
                                
                            
                            )}


                            <div className='renewal-page-form-uploadfiles'>
                                <div
                                    style={{
                                        className:"registration-form-requirements-buttons",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexWrap: "wrap"
                                    }}
                                    >
                                    <div className="upload-requirements-div">
                                        <FileUpload label="OR/CR" onChange={setOrcr}/>
                                    </div>
                                    <div className="upload-requirements-div">
                                        <FileUpload label="License" onChange={setLicense} />
                                    </div>
                                    
                                </div>
                            </div>
                            
                            
                        </div>
                        <div
                                style={{textAlign:'center'}}>
                                <button
                                    style={{
                                        margin: "1rem",
                                        backgroundColor: "#F4C522",
                                        color: "#8A252C", // Use color property to change font color
                                        borderRadius: "1rem",
                                        fontSize: "1rem",
                                        padding: "0.5rem 1rem",
                                        cursor: "pointer"
                                    }}
                                    onClick={handleSubmit} // Call handleSubmit function when the button is clicked
                                >
                                    SUBMIT
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            {/* Loader */}
            {loading && (
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                
            >
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
            <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)} />            
            {/* <Footer /> */}
        </>
    );
}
