import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import axios from 'axios';
import FileUpload from '../../vehicle_registration/uploadImage';
import { ConfirmModal } from './ResendORCRLicenseUploadConfirmationModal';

function ResendORCRLicenseModal({ open, handleCloseResendModal, applicant, handleReload }) {
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null); // New state for photo3
  const [disableSubmit, setDisableSubmit] = useState(true);
  const token = localStorage.getItem("token");

  // Confirmation Modal
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleCloseConfirmationModal = () => {
    setOpenConfirmationModal(false);
    handleReload();
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    let disable = false;

    if (applicant.resendLicense && !photo2) {
      disable = true;
    }

    if (applicant.resendORCR && !photo1) {
      disable = true;
    }

    if (applicant.resendProof && !photo3) { // Check for photo3 if required
      disable = true;
    }

    setDisableSubmit(disable);
  }, [applicant, photo1, photo2, photo3]); // Include photo3 in dependencies

  const handleSubmit = async () => {
    let res2 = null;
    let res3 = null;
    let res4 = null; // Response for photo3

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (applicant.resendORCR) {
      const formData1 = new FormData();
      formData1.append("file", photo1);
      formData1.append("name", `${applicant.email}:orcr`);
      formData1.append("username", applicant.email);
      formData1.append("type", 1);
      res2 = await axios.post(
        "http://localhost:8080/photos/upload",
        formData1,
        config
      );
    }

    if (applicant.resendLicense) {
      const formData2 = new FormData();
      formData2.append("file", photo2);
      formData2.append("name", `${applicant.email}:license`);
      formData2.append("username", applicant.email);
      formData2.append("type", 2);
      res3 = await axios.post(
        "http://localhost:8080/photos/upload",
        formData2,
        config
      );
    }

    if (applicant.resendProof) {
      const formData3 = new FormData();
      formData3.append("file", photo3);
      formData3.append("name", `${applicant.email}:proof_of_payment`);
      formData3.append("username", applicant.email);
      formData3.append("type", 3);
      res4 = await axios.post(
        "http://localhost:8080/photos/upload",
        formData3,
        config
      );
    }

    // Handling responses
    if (applicant.resendLicense && applicant.resendORCR && applicant.resendProof) {
      if (res2?.status === 200 && res3?.status === 200 && res4?.status === 200) {
        setMessage("Resend of ORCR, License, and Proof photos submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of ORCR, License, and Proof photos");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendLicense && applicant.resendORCR) {
      if (res2?.status === 200 && res3?.status === 200) {
        setMessage("Resend of ORCR and License photos submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of ORCR and License photos");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendLicense && applicant.resendProof) {
      if (res3?.status === 200 && res4?.status === 200) {
        setMessage("Resend of License and Proof photos submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of License and Proof photos");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendORCR && applicant.resendProof) {
      if (res2?.status === 200 && res4?.status === 200) {
        setMessage("Resend of ORCR and Proof photos submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of ORCR and Proof photos");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendLicense) {
      if (res3?.status === 200) {
        setMessage("Resend of License photo submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of License photo");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendORCR) {
      if (res2?.status === 200) {
        setMessage("Resend of ORCR photo submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of ORCR photo");
        setOpenConfirmationModal(true);
      }
    } else if (applicant.resendProof) {
      if (res4?.status === 200) {
        setMessage("Resend of Proof photo submitted successfully");
        setOpenConfirmationModal(true);
      } else {
        setMessage("Failed to submit resend of Proof photo");
        setOpenConfirmationModal(true);
      }
    }

    // Update applicant status
    const updateStatus = async () => {
      try {
        await axios.put(
          `http://localhost:8080/applicants/resend-update-status`,
          null,
          {
            params: { email: applicant.email },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Error updating status:", error);
        throw error;
      }
    };

    await updateStatus();

    // Logging responses
    console.log("response 1", res2);
    console.log("response 2", res3);
    console.log("response 3", res4);

    handleCloseResendModal();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseResendModal} maxWidth="md" fullWidth>
        <DialogTitle>Upload Photos</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {applicant.resendORCR && <FileUpload label="Upload ORCR" onChange={setPhoto1} required />}
            {applicant.resendLicense && <FileUpload label="Upload License" onChange={setPhoto2} required />}
            {applicant.resendProof && <FileUpload label="Upload Proof of Payment" onChange={setPhoto3} required />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" disabled={disableSubmit}>
            Submit
          </Button>
          <Button onClick={handleCloseResendModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmModal isOpen={openConfirmationModal} onClose={handleCloseConfirmationModal} message={message} />
    </div>
  );
}

export default ResendORCRLicenseModal;
