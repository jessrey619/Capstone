import React, { useState } from 'react';
import axios from 'axios';
import "./Scan.css"

function VehicleDisplay({ title }) {
    const [sticker, setSticker] = useState("");
    const [expire, setExpire] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [plateNo, setPlateNo] = useState("");
    const [color, setColor] = useState("");
    const [vehicle1, setVehicle1] = useState({})
    const [vehicle2, setVehicle2] = useState({})
    const [searchValue, setSearchValue] = useState("");

    const [applicants, setApplicants] = useState([])

    function handleInputChange(event) {
        setSearchValue(event.target.value);
    }

    function handleSubmit() {
     
            // Get the value of the search input
            var searchValue = document.getElementById('searchText').value;
        
            // Log the search input value to the console
            console.log('Search query:', searchValue);
            
            // Make a search request using axios.get with query parameters
            axios.get(`http://localhost:8080/vehicles/find-by-sticker-id/${searchValue}`)
            .then(response => {
                if (response.data.length > 0) {
                    const vehicle = response.data[0]; 
                    setVehicle1(response.data)
                    console.log("Vehicle return Response:",response.data)
                } else {
                    console.error('No vehicles found for this username');
                }
            })
            .catch(error => {
                console.error('Error fetching vehicle details:', error);
            });
    
        // Return false to prevent the form from actually submitting
        return false;
            // Return false to prevent the form from actually submitting
            return false;
        }


        
    
    return (
        <div className="OuterContainer">
            <div className="firstInner">
                <p>Sticker ID: </p> 
                <div className="infoInput"style={{ marginTop:'2%', marginRight:'2%'}} >
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
                <div>
                    <div className="infoInput" style={{ width:'25vw', height:'8vh', marginTop:'5px', marginRight:'10px'}}>
                        <p>{expire}</p>
                    </div>
                    <div className="infoInput" style={{ width:'25vw', height:'8vh', marginTop:'10px',marginRight:'10px' }}>
                        <p>{name}</p>
                    </div>
                </div>
            </div>
            
            <div className="secondInner">
                <div className="left-section">
                    <p style={{margin:'0 auto', textAlign:'center', width:'10vw'}}>Sticker Type:</p> 
                    <div className="infoInput" style={{ width:'11.5vw', height:'22vh', margin:'0 auto', alignItems:'center'}}>
                        <p style={{ margin:'40px auto', alignItems:'center'}}>{type}</p>
                    </div>
                </div>
                <div className="right-section">
                    <div className="top-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px'}}>Plate No.:</p> 
                        <div className="infoInput" style={{ width:'13vw', height:'10vh',}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}>{plateNo}</p>
                        </div>
                    </div>

                    <div className="bottom-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px', flexDirection:'row',}}>Color:</p> 
                        <div className="infoInput" style={{ width:'13vw', height:'10vh', marginRight:'15px'}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}>{color}</p>
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
            <div className="top">
                <img src="/citu-logoSmall.png" alt="CITULogo" className="topImage" />
            </div>

            <div>
                <img src="/RFID_background.png" alt="background" className="bgRFID" />
            </div>

            <div className="display">
                <VehicleDisplay title="First Display" />
                <VehicleDisplay title="Second Display" />
            </div>
        </div>
    );
}

export default Scans;
