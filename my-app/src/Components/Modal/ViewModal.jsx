import React from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';
import './viewModal.css';

function ViewModal({ open, handleClose, application }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-style">
        <Typography variant="h6">Personal Details</Typography>
        <div className="modal-content">
          <div className="label-value">
            <div className="label">Name:</div>
            <div>{`${application.firstName} ${application.middleInitial} ${application.lastName}`}</div>
          </div>
          <div className="label-value">
            <div className="label">User Type:</div>
            <div>{application.is_staff ? 'Faculty' : 'Student'}</div>
          </div>
          <div className="label-value">
            <div className="label">Applicant Id:</div>
            <div>{application.applicantid}</div>
          </div>
          <div className="label-value">
            <div className="label">Grade Level:</div>
            <div>{application.gradeLevel}</div>
          </div>
          <div className="label-value">
            <div className="label">Contact Number:</div>
            <div>{application.contactNumber}</div>
          </div>
          <div className="label-value">
            <div className="label">Email:</div>
            <div>{application.email}</div>
          </div>
          <div className="label-value">
            <div className="label">Address:</div>
            <div>{application.address}</div>
          </div>
        </div>
        <Divider className="modal-divider" />
        <Typography variant="h6">Vehicle Details</Typography>
        <div className="modal-content">
          <div className="label-value">
            <div className="label">Vehicle Make:</div>
            <div>{application.vehicle_make}</div>
          </div>
          <div className="label-value">
            <div className="label">Plate No:</div>
            <div>{application.plate_no}</div>
          </div>
          <div className="label-value">
            <div className="label">Wheels:</div>
            <div>{application.vehicle_type === 0 ? '2' : '4'}</div>
          </div>
          <div className="label-value">
            <div className="label">Color:</div>
            <div>{application.color}</div>
          </div>
        </div>
        <Divider className="modal-divider" />
        <Typography variant="h6">Application Details</Typography>
        <div className="modal-content">
          <div className="label-value">
            <div className="label">Date Submitted:</div>
            <div>{new Date(application.datesubmitted).toLocaleDateString()}</div>
          </div>
          <div className="label-value">
            <div className="label">Approved:</div>
            <div>{application.is_approved ? 'Yes' : 'No'}</div>
          </div>
          <div className="label-value">
            <div className="label">Verified:</div>
            <div>{application.is_verified ? 'Yes' : 'No'}</div>
          </div>
          <div className="label-value">
            <div className="label">Paid:</div>
            <div>{application.is_paid ? 'Yes' : 'No'}</div>
          </div>
          <div className="label-value">
            <div className="label">Proof of Payment:</div>
            <div><a href={application.proof_of_payment} target="_blank" rel="noopener noreferrer">Click to view picture</a></div>
          </div>
          <div className="label-value">
            <div className="label">License:</div>
            <div><a href={application.license} target="_blank" rel="noopener noreferrer">Click to view picture</a></div>
          </div>
          <div className="label-value">
            <div className="label">OR/CR:</div>
            <div><a href={application.or_cr} target="_blank" rel="noopener noreferrer">Click to view picture</a></div>
          </div>
        </div>
        <Button onClick={handleClose} variant="contained" className="modal-button">
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ViewModal;
