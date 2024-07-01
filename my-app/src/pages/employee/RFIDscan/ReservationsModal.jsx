import React from 'react';
import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReservationModal = ({ reservationsForToday, visible, onClose }) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="reservation-modal-title"
      aria-describedby="reservation-modal-description"
    >
      <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
        <Table aria-label="reservations-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name Of Driver</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Cancelled</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationsForToday.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.id}</TableCell>
                <TableCell>{formatDate(reservation.date)}</TableCell>
                <TableCell>{reservation.nameOfDriver}</TableCell>
                <TableCell>{reservation.quantity}</TableCell>
                <TableCell>{reservation.fourWheel ? '4-Wheeler' : '2-Wheeler'}</TableCell>
                <TableCell>{reservation.cancelled ? 'Yes' : 'No'}</TableCell>
                <TableCell>{reservation.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default ReservationModal;
