import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export function ConfirmModal({ message, isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {message}
        </Typography>
        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}
