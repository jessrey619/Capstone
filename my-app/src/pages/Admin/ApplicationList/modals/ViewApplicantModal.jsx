import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect, useState } from "react";

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


export default function ViewApplicantModal({ isOpen, setIsOpen, applicant }) {
  console.log("applicant", applicant);

  const token = localStorage.getItem('token');

  const [orcrImg, setOrcrImg] = useState()
  const [licensePhotoUrl, setLicensePhotoUrl] = useState('')
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('')
  const [isPhotoModalOpen,setIsPhotoModalOpen] = useState(false)
  const [email,setEmail] = useState('')


  const handleViewLicenseClick = async () => {
    const url = await fetchPhoto('license');
    if (url) {
      setLicensePhotoUrl(url);
      handleOpenPhotoModal(url);
    }
  };

  const handleViewOrcrClick = async () => {
    const url = await fetchPhoto('orcr');
    if (url) {
      setLicensePhotoUrl(url);
      handleOpenPhotoModal(url);
    }
  };

  const handleProofOfPaymentClick = async () => {
    const url = await fetchPhoto('proof_of_payment');
    if (url) {
      setLicensePhotoUrl(url);
      handleOpenPhotoModal(url);
    }
  };

  const handleOpenPhotoModal = (photoUrl) => {
    setCurrentPhotoUrl(photoUrl);
    setIsPhotoModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const fetchPhoto = async (photoType) => {
    try {
    // const [footer, setFooter] = useState('')

      const response = await axios.get(
        `http://localhost:8080/photos/get-photo-by-name/${applicant.email}:${photoType}`,
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


  return (
    <div>
      <Modal
        open={isOpen ?? false}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box className="applist-modal applist-modal-view">
          {/* Modal Content */}
          <h2>Applicant</h2>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="10%"></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Name:</TableCell>
                  <TableCell align="left">{applicant.studentName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Email: </TableCell>
                  <TableCell align="left">{applicant.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Applicant ID: </TableCell>
                  <TableCell align="left">{applicant.applicantid}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Grade Level: </TableCell>
                  <TableCell align="left">{applicant.gradeLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Contact Number: </TableCell>
                  <TableCell align="left">{applicant.contactNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Address:</TableCell>
                  <TableCell align="left">{applicant.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">User Type:</TableCell>
                  <TableCell align="left">
                    {applicant.isStaff ? "Employee" : "Student"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Vehicle Make:</TableCell>
                  <TableCell align="left">{applicant.vehicleMake}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Plate No.:</TableCell>
                  <TableCell align="left">{applicant.plateNo}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Color:</TableCell>
                  <TableCell align="left">{applicant.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Wheels:</TableCell>
                  <TableCell align="left">
                    {applicant.isFourWheel ? "4" : "2"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">OR/CR:</TableCell>
                  <TableCell align="left">

                      <Button
                        onClick={handleViewOrcrClick}
                        sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>
   
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">License</TableCell>
                  <TableCell align="left">
                      <Button 
                        onClick={handleViewLicenseClick}
                        sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Proof of Payment</TableCell>
                  <TableCell align="left">

                      <Button
                        onClick={handleProofOfPaymentClick}
                        sx={{ textTransform: "none", color: "#8A252C" }}>
                        Click to View Image
                      </Button>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Date Submitted</TableCell>
                  <TableCell align="left">
                    {new Date(applicant.datesubmitted).toLocaleDateString("en-PH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Verified</TableCell>
                  <TableCell align="left">
                    {applicant.verified ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Approved</TableCell>
                  <TableCell align="left">
                    {applicant.approved ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Paid</TableCell>
                  <TableCell align="left">
                    {applicant.paid ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Modal
        open={isPhotoModalOpen}
        onClose={handleClosePhotoModal}
        aria-labelledby="photo-modal-title"
        aria-describedby="photo-modal-description"
        >
        <Box sx={{ ...style, width: '100%', height: '100%' }}>
            <Typography id="photo-modal-title" variant="h6" component="h2">
            Photo
            </Typography>
            {currentPhotoUrl && (
            <img src={currentPhotoUrl} alt="Fetched Photo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            )}
        </Box>
        </Modal>
    </div>
  );
}
