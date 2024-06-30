import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Checkbox, FormControlLabel, FormGroup, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import axios from 'axios';
import './ReservationManagement.css';
import CancelDialog from './ReservationManagementCancelButtonDialog';
import CancelConfirmationDialog from './ReservationManagementConfirmCancelDialog';
import CreateConfirmDialog from './ReservationManagementCreateConfirmationDialog';

function ReservationManagement() {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [fourWheel, setFourWheel] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState("");
    const [listOfReservations, setListOfReservations] = useState([]);
    const [filterDate, setFilterDate] = useState(dayjs());

    const initialDateRef = useRef(dayjs()); 

    const handleCheckboxChange = (event) => {
        setFourWheel(event.target.checked);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const disablePastDates = (date) => {
        return date.isBefore(dayjs().startOf('day'));
    };

    // Create Reservations
    const [openCreateConfirm, setOpenCreateConfirm] = useState(false);
    
    const handleCloseCreateConfirm = () => {
        setOpenCreateConfirm(false);
        setCancelTrigger(!cancelTrigger)
    }

    const handleButtonClick = async () => {
        try {
          const response = await axios.post('http://localhost:8080/parking-reservations/create', {
            date: selectedDate.format('YYYY-MM-DD'),
            fourWheel: fourWheel,
            quantity: quantity,
            reason: reason,
          });
          console.log('Reservation created:', response.data);
          setMessage(response.data)
          setOpenCreateConfirm(true);
          
        } catch (error) {
          console.error('Error creating reservation:', error);
        }
    };

    // FOR CANCEL BUTTON DIALOG
    const [open, setOpen] = useState(false);
    const [chosenId, setChosenId] = useState();
    const [cancelTrigger, setCancelTrigger] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false)
    const [message, setMessage] = useState("")

    const handleClickOpen = (id) => {
        console.log(id);
        setChosenId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setCancelTrigger(!cancelTrigger);
    };

    const handleMessage = (message) => {
        setMessage(message);
    };

    useEffect(() => {
        const fetchReservations = async () => {
          try {
            const response = await axios.get('http://localhost:8080/parking-reservations/get-by-date', {
                params: { date: filterDate.format('YYYY-MM-DD') },
            });
            setListOfReservations(Array.isArray(response.data) ? response.data : []);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching reservations:', error);
            setListOfReservations([]); // Set to empty array on error
          }
        };
    
        fetchReservations();
      }, [cancelTrigger, filterDate]);

    return (
        <div className="reservation-main-body">
            <div className="reservation-left-column">
                <h5>Create Reservation:</h5>
                <div className="reservation-left-contents">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e)}
                            label="Date of Reservation"
                            shouldDisableDate={disablePastDates}
                            sx={{ width: '100%' }}
                        />
                        <FormGroup>
                            <FormControlLabel 
                                control={<Checkbox 
                                    checked={fourWheel}
                                    onChange={handleCheckboxChange}
                                    />} 
                                label="Four-Wheel"
                            />
                        </FormGroup>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            inputProps={{ min: 1 }}
                        />
                        <br />
                        <TextField
                            label="Reason"
                            value={reason}
                            onChange={handleReasonChange}
                            variant="outlined"
                            fullWidth
                            margin="dense"
                        />
                    </LocalizationProvider>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                        style={{ marginTop: '10px', backgroundColor: 'Gold', borderRadius: '5px', color: 'black' }}
                    >
                        Submit
                    </Button>
                </div>
            </div>

            <div className="reservation-right-column">
                <h5>Reservations:</h5>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={filterDate}
                        onChange={(e) => setFilterDate(e)}
                        label="Reservation By Date"
                        shouldDisableDate={disablePastDates}
                        sx={{ width: '100%' }}
                    />
                </LocalizationProvider>
                <List sx={{ width: '100%', maxWidth: '100%' }}>
                    {listOfReservations
                        .filter((reservation) => !reservation.cancelled)
                        .map((reservation, index) => (
                            <ListItem sx={{ backgroundColor: 'lightgray' }} key={index}>
                                <ListItemText
                                    primary={dayjs(reservation.date).format('MMMM D, YYYY')}
                                    secondary={`Type: ${reservation.fourWheel ? 'Four-Wheel' : 'Two-Wheel'} | Quantity: ${reservation.quantity} | Reason: ${reservation.reason}`}
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleClickOpen(reservation.id)}
                                >
                                    Cancel
                                </Button>
                            </ListItem>
                        ))}
                </List>

                {/* Modals/Dialogs for Pop up things */}
                <CancelDialog open={open} handleClose={handleClose} id={chosenId} handleOpenConfirm={handleOpenConfirm} handleMessage={handleMessage} />
                <CancelConfirmationDialog open={openConfirm} handleCloseConfirm={handleCloseConfirm} message={message} />
                <CreateConfirmDialog open={openCreateConfirm} handleCloseCreateConfirm={handleCloseCreateConfirm} message={message} />
            </div>
        </div>
    );
}

export default ReservationManagement;
