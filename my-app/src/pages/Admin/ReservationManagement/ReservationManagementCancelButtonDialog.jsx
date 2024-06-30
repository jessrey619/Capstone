import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import axios from 'axios';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CancelDialog({open, handleClose, id, handleOpenConfirm, handleMessage}) {
  
    const handleConfirm = async () => {
        try {
        const response = await axios.put(`http://localhost:8080/parking-reservations/${id}/cancel`);
        handleClose();
        handleMessage(response.data)
        handleOpenConfirm();
        console.log('Cancellation successful:', response.data);
        // Optionally update state or perform other actions after cancellation
        } catch (error) {
        console.error('Error cancelling reservation:', error);
        // Handle errors as needed
        }
    };
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Cancel Reservation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
