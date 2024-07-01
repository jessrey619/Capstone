import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Scan.css";
import EmployeeSidebar from '../../../components/Navbar/EmployeeSidebar/employeeSidebar';
import LogsEmployee from '../employeeLogs/LogsEmployee';
import Header from '../../../components/Navbar/EmployeeHeader';
import moment from 'moment/moment';
import ReservationModal from './ReservationsModal';

function VehicleDisplay({ title, id }) {
    const [vehicle1, setVehicle1] = useState({});
    const [applicant1, setApplicant1] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [isExpired, setIsExpired] = useState(true);

    // TIME IN AND TIME OUT
    const [log, setLog] = useState({});

    const formatDate = (dateString) => {
        if (!dateString) return '-------'; // Handle null case

        const date = new Date(dateString);
        const options = { 
            month: 'short', 
            day: '2-digit', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true 
        };
        return date.toLocaleDateString('en-US', options);
    };

    // FOR RESERVATION MODAL
    const [modalVisible, setModalVisible] = useState(false);
    const [reservationsForToday, setReservationsForToday] = useState([]); // Assuming this state is populated with data

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // FOR LIVE COUNT
    const [totalVehiclesInside, setTotalVehiclesInside] = useState(0)
    const [fourWheels, setFourWheels] = useState(0)
    const [twoWheels, setTwoWheels] = useState(0)
    const [parkingAreas, setParkingAreas] = useState([])

    function handleInputChange(event) {
        setSearchValue(event.target.value);
    }

    useEffect(() => {
        if (searchValue) {
            if(totalVehiclesInside<totalNumberOfParkingSlots){
                axios.post(`http://localhost:8080/logs/log-in`, null, {
                    params: {
                        stickerId: parseInt(searchValue)
                    }
                })
                .then(response => {
                    if (response.data) {
                        const statusResult = response.data; // Store status result here
                        setLog(statusResult); // Update state or do other operations
                        console.log("Log return Response:", statusResult);
                    } else {
                        console.error('Error in Logging');
                    }
                    statusCode = response.status; // Get HTTP status code
                    
                    // Check if status code is 200 before making subsequent requests
                    if (statusCode === 200) {
                        // Make subsequent Axios calls
                        axios.get('http://localhost:8080/parking/count/motorcycles')
                            .then(response => {
                                if (response.data) {
                                    setTwoWheels(response.data);
                                } else {
                                    console.error('Error in Getting Two Wheels');
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching Counting:', error);
                            });
                
                        axios.get('http://localhost:8080/parking/count/cars')
                            .then(response => {
                                if (response.data) {
                                    setFourWheels(response.data);
                                } else {
                                    console.error('Error in Getting Four Wheels');
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching Counting:', error);
                            });
                        
                        axios.get(`http://localhost:8080/vehicles/find-by-sticker-id`, {
                                params: {
                                    stickerId: searchValue
                                }
                            })
                            .then(response => {
                                if (response.data) {
                                    setVehicle1(response.data);
                                    console.log("Vehicle return Response:", response.data);
                                } else {
                                    console.error('No vehicles found for this stickerId');
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching vehicle details:', error);
                            });
                
                        axios.get('http://localhost:8080/parking/active')
                            .then(response => {
                                if (response.data) {
                                    setParkingAreas(response.data);
                                } else {
                                    console.error('Error in Getting Parking Areas');
                                }
                            })
                            .catch(error => {
                                console.error('Error fetching Counting:', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('Error fetching Log details:', error);
                    if (error.response) {
                        statusCode = error.response.status; // Get HTTP status code from error response
                    }
                });
            }
            let statusCode;
            
            
        }
    }, [searchValue]);

    useEffect(() => {
        setTotalVehiclesInside(fourWheels+twoWheels);
      }, [twoWheels, fourWheels]);

    useEffect(() => {
        axios.get('http://localhost:8080/parking/count/motorcycles')
            .then(response => {
                setTwoWheels(response.data)
            })
            .catch(error => {
                console.error('Error fetching Counting:', error);
            });

            axios.get('http://localhost:8080/parking/count/cars')
            .then(response => {
                setFourWheels(response.data)
            })
            .catch(error => {
                console.error('Error fetching Counting:', error);
            });

            axios.get('http://localhost:8080/parking/active')
            .then(response => {
                setParkingAreas(response.data)
                
            })
            .catch(error => {
                console.error('Error fetching Counting:', error);
            });
    },[])

    // Get the total number of available parking
    const [totalNumberOfParkingSlots, setTotalNumberOfParkingSlots] = useState(0);
    const [listOfReservations, setListOfReservations] = useState([]);
    const [overallNumberOfParkingSlots, setOverallNumberOfParkingSlots] = useState(0);
    const [numberOfReservationsToday, setNumberOfReservationsToday] = useState(0);

    useEffect(()=>{
        let overallparking;
        axios.get('http://localhost:8080/parking/total-space')
        .then(response => {
            if(response.data){
                setOverallNumberOfParkingSlots(response.data)
                overallparking = response.data;
            }else{
                console.error('Error in Getting Total Available Parking Slots');
            }
            })
        .catch(error => {
                console.error('Error fetching Parking:', error);
            });
        
                const today = moment().format('YYYY-MM-DD'); // Get today's date in 'yyyy-MM-dd' format
    
                axios.get('http://localhost:8080/parking-reservations/get-by-date', {
                        params: {
                            date: today
                        }
                    }).then(response =>{
                        if (response.data) {
                            setListOfReservations(response.data);
                            console.log("Reservations return Response:",response.data);
        
                            const reservationsToday = response.data.length;
                            setTotalNumberOfParkingSlots(overallparking-reservationsToday)
                            console.log("Reservations return Response Length:",reservationsToday);
                        } else {
                            console.error('Error in Getting Reservations');
                        }
            })
    },[])
    
    // End of Get total available Parking

    useEffect(() => {
        if (vehicle1.username) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/jwt/get-user`, {
                        params: {
                            username: vehicle1.username,
                        }
                    });
                    setApplicant1(response.data);
                    console.log("Applicant return Response:", response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [vehicle1]);

    useEffect(() => {
        if (vehicle1.expirationDate) {
            if (new Date(vehicle1.expirationDate).getTime() < new Date().getTime()) {
                setIsExpired(true);
                console.log("APPLICANT EXPIRED", isExpired);
            } else {
                setIsExpired(false);
                console.log("APPLICANT GOODS", isExpired);
            }
        }
    }, [vehicle1]);

    return (
        <div style={{display:'flex', flexDirection:'column', width: '80vw'}}>
            <div className="liveContainer">
                            <div className="totalContain">

                                <table className="liveCount">
                                    <thead>
                                        <tr>
                                            <th className="totalLive">Total Occupied Space</th>
                                            <th className="totalLive">
                                            {totalVehiclesInside >= totalNumberOfParkingSlots ? (
                                                <span style={{ color: 'red' }}>FULL</span>
                                            ) : (
                                                `${totalVehiclesInside}/${totalNumberOfParkingSlots}`
                                            )}
                                            </th>
                                        </tr>
                                    </thead>
                                            <tbody>
                                                <tr className="liveContent">
                                            <td>
                                                Cars: {fourWheels}
                                            </td>
                                            <td>
                                                Motors: {twoWheels}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="secondCount">
                                        <thead>
                                            <tr className="totalDets">
                                            <th className="totalLive"></th>
                                            <th className="totalLive">Cars</th>
                                            <th className="totalLive">Motors</th>
                                            <th className="totalLive">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {parkingAreas.map(area => (
                                        <tr key={area.id} className="secondCont">
                                            <td>{area.name}</td>
                                            <td>{area.numberOfCars}</td>
                                            <td>{area.numberOfMotorcycles}</td>
                                            <td>{area.isActive? 'Active': 'Inactive'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            <div>
                                {listOfReservations.length > 0 && (<button onClick={openModal}>View Reservations</button>)}
                            </div>

                            
                                <ReservationModal
                                    reservationsForToday={listOfReservations}
                                    visible={modalVisible}
                                    onClose={closeModal}
                                />
                            </div>
                            
                            
            </div>
            <div className="OuterContainer">
                <div className="firstInner">
                    <div  className="stickerIdLabel" style={{fontWeight:'bold'}}>
                        Sticker ID:
                    </div>
                    
                    {/* INPUT AREA */}
                    <div className="infoInput">
                        <div className="stickerSearch">
                            <div className="stickerInput" >
                                <input
                                    id="searchInput"
                                    type="text"
                                    placeholder="Sticker ID"
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    required
                                
                                />
                            </div>
                        </div>
                    </div>
                    {/* end of Input area */}
                </div>
                <div className='scan-vehicle-divider'>
                    <div className='scan-vehicle-divider-left-side'>
                        <div className="firstInner">
                            <div>
                                <p style={{ margin: 'auto' }}>Sticker Type: <br /> <br /> Plate No.: </p>
                            </div>
                            
                            <div className='duo' style={{width:'25vw', paddingRight:'2vw'}}>
                                <div className="infoInput1" style={{ marginLeft: '4%',width:'100%' }}>
                                    <p style={{ alignItems: 'center' }}>{applicant1.isParking ? 'Four Wheel' : 'Two Wheel'}</p>
                                </div>
                                <div className="infoInput1" style={{ marginTop: '3%',marginLeft: '4%',marginRight: '%',width:'100%' }}>
                                    <p style={{ alignItems: 'center' }}>{vehicle1.plateNo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SIDE */}
                    <div className='scan-vehicle-divider-right-side'>
                        <div className="firstInner">
                            <p style={{ margin: 'auto' }}>Status: <br /> <br /> Name: </p>
                            <div className='duo' style={{width:'25vw', paddingRight:'2vw'}}>
                                <div className="infoInput1" style={{ marginLeft: '4%',width:'100%' }}>
                                    <p style={{ color: isExpired ? 'red' : 'green' }}>
                                        {isExpired === '' ? '' : isExpired ? 'EXPIRED' : 'ACTIVE'}
                                    </p>
                                </div>
                                <div className="infoInput1" style={{ marginTop: '3%',marginLeft: '4%',marginRight: '%',width:'100%' }}>
                                    <p>{vehicle1.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TIME IN AND TIME OUT */}
                <div className="firstInner">
                    <div>
                        <p style={{ margin: 'auto' }}>Time-In: <br /><br /> <br /> Time-Out: </p>
                    </div>
                            
                            <div className='duo' style={{width:'50vw'}}>
                                <div className="infoInput1" style={{width:'50vw' }}>
                                    <p style={{ alignItems: 'center' }}>{log.timeIn !== null ? formatDate(log.timeIn) : '-------'}</p>
                                </div>
                                <div className="infoInput1" style={{ marginTop: '3%',width:'50vw' }}>
                                    <p style={{ alignItems: 'center' }}>{log.timeOut !== null ? formatDate(log.timeOut) : '-------'}</p>
                                </div>
                            </div>
                </div>
            </div>

            
        </div>
        
    );
}

function Scans() {
    return (
        <>
            <Header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }} />
            <div className="RFIDbg">
                <div>
                    <img src="/RFID_background.png" alt="background" className="bgRFID" />
                </div>
                <div className='scan-vehicle-employee-sidebar'>
                    <EmployeeSidebar />
                </div>
                <div className="displayUI">
                    <VehicleDisplay title="First Display" />
                </div>
            </div>
        </>
    );
}

export { VehicleDisplay, Scans };
