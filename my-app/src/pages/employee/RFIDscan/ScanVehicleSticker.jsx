import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Scan.css"

function VehicleDisplay({ title }) {
    const [vehicle1, setVehicle1] = useState({})
    const [applicant1, setApplicant1] = useState({})
   //const [vehicle2, setVehicle2] = useState({})
    const [searchValue, setSearchValue] = useState(0);
    const [isExpired, setIsExpired] = useState(false)


    function handleInputChange(event) {
        console.log(event.target.value)
        setSearchValue(event.target.value);
    }

    function handleSubmit() {
        
            // Log the search input value to the console
            console.log('Search query:', searchValue);
            
            // Make a search request using axios.get with query parameters
            axios.get(`http://localhost:8080/vehicles/find-by-sticker-id`,{
                params:{
                    stickerId: searchValue
                }
            })
            .then(response => {
                if (response.data) {
                    const vehicle = response.data; 
                    setVehicle1(response.data)
                    console.log("Vehicle return Response:",response.data)
                } else {
                    console.error('No vehicles found for this stickerId');
                }
            })
            .catch(error => {
                console.error('Error fetching vehicle details:', error);
            });
    
        // Return false to prevent the form from actually submitting
        return false;
            // Return false to prevent the form from actually submitting
        }



        

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/jwt/get-user`,{
                        params:{
                            username: vehicle1.username,
                        }
                    }).then(response=>{
                        setApplicant1(response.data)
                        console.log("Applicant return Response:",response.data)
                    })
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchData();
        }, [searchValue]);

        useEffect(() => {
            if(new Date(vehicle1.expirationDate).getTime()<new Date().getTime()) {
                setIsExpired(true);
            }
            else{
                setIsExpired(false);
            }
        }, [applicant1]);
        
    
    return (
        <div className="OuterContainer">
            <div className="firstInner">
                <p>Sticker ID: </p> 
                <div className="infoInput" >
                    <div className="stickerSearch">
                        <div className="stickerInput">
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Sticker ID"
                                value={searchValue}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="stickerBtn">
                            <button type="button" onClick={handleSubmit}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="firstInner">
                <p style={{margin:'auto'}}>Status: <br/> <br/> Name: </p> 
                <div className='duo'>
                    <div className="infoInput1" style={{ marginRight:'4%'}}>
                        <p>{isExpired?'EXPIRED':'ACTIVE'}</p>
                    </div>
                    <div className="infoInput1" style={{ marginTop:'3%'}}>
                        <p>{vehicle1.name}</p>
                    </div>
                </div>
            </div>
            
            <div className="secondInner">
                <div className="left-section">
                    <p style={{margin:'0 auto', textAlign:'center'}}>Sticker Type:</p> 
                    <div className="infoInput2" style={{alignItems:'center'}}>
                        <p style={{ alignItems:'center'}}>{applicant1.isParking? 'Four Wheel':'Two Wheel'}</p>
                    </div>
                </div>
                <div className="right-section">
                    <div className="top-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '10%', marginLeft:'3%'}}>Plate No.:</p> 
                        <div className="infoInput3">
                            <p style={{ margin:'10% auto', alignItems:'center'}}>{vehicle1.plateNo}</p>
                        </div>
                    </div>

                    <div className="bottom-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{flexDirection:'row'}}>Color:</p> 
                        <div className="infoInput4">
                            <p style={{ margin:'9% auto', alignItems:'center'}}>{vehicle1.color} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Scans() {
    return (
        <div className="RFIDbg">
            <div className="topHeader">
                <img src="/citu-logoSmall.png" alt="CITULogo" className="topImage" />
            </div>

            <div>
                <img src="/RFID_background.png" alt="background" className="bgRFID" />
            </div>

            <div className="displayUI">
                <VehicleDisplay title="First Display" />
                <VehicleDisplay title="Second Display" />
            </div>
        </div>
    );
}

export default Scans;
