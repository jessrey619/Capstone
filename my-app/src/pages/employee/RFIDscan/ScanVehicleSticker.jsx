import React from "react";
import './Scan.css';


function Scans() {
    const [disclaimer, setDisclaimer] = React.useState([])
    const [userId, setuserId] = React.useState("18-6969-420")
    const [type, settype] = React.useState("Pick up/ Drop-off")
    
    // useEffect(() => {
    //     axios.get('http://localhost:8080/logs/all')
    //       .then(response => {
    //         setLogs(response.data);
    //         console.log(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching logs:', error);
    //       });

    //       axios.get('http://localhost:8080/logs/vehicle-types/count')
    //       .then(response => {
    //         const fourWheel = response.data.fourWheelCount;
    //         const twoWheel = response.data.otherCount;
    //         const total = fourWheel + twoWheel;
    //         setTwoWheels(twoWheel)
    //         setTotalVehicles(total);
    //         setFourWheels(fourWheel);
            
    //       })
    //       .catch(error => {
    //         console.error('Error fetching Counting:', error);
    //       });

    //       axios.get('http://localhost:8080/parking/active')
    //       .then(response => {
    //         setParkingAreas(response.data)
            
    //       })
    //       .catch(error => {
    //         console.error('Error fetching Counting:', error);
    //       });
    //   }, []);
    
    return (
        <div className="RFIDbg">
        <div className="top">
        <img src="/citu-logoSmall.png" alt="CITULogo" className="topImage" />
        </div>

        {/* contents */}
        <div className="display">

            <div className="OuterContainer">

                <div className="firstInner">
                    <p>Sticker ID: </p> 
                    <div className="input">
                        {/* CHANGE */}
                    <p> {disclaimer}</p>
                    </div>
                </div>

                <div className="firstInner">
                    <p style={{margin:'auto'}}>User ID: <br/> <br/> Name: </p> 
                   
                   <div>
                    {/* CHANGE */}
                    <div className="input" style={{ width:'25vw', height:'8vh', marginTop:'5px', marginRight:'10px'}}>
                    <p> {userId}</p>
                    </div>
                    {/* CHANGE */}
                    <div className="input" style={{ width:'25vw', height:'8vh', marginTop:'10px',marginRight:'10px' }}>
                    <p> {disclaimer}</p>
                    </div>

                    </div>

                </div>
                
                <div className="secondInner">

                    <div class="left-section">

                    <p style={{margin:'0 auto', textAlign:'center', width:'10vw'}}>Sticker Type:</p> 
                    {/* CHANGE */}
                    <div className="input" style={{ width:'11.5vw', height:'22vh', margin:'0 auto', alignItems:'center'}}>
                    <p style={{ margin:'40px auto', alignItems:'center'}}> {type}</p>
                    </div>
                    
                    </div>
                        <div class="right-section">

                        <div class="top-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px'}}>Plate No.:</p> 
                        {/* CHANGE */}
                        <div className="input" style={{ width:'13vw', height:'10vh',}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}> {disclaimer}</p>
                        </div>

                        </div>

                        <div class="bottom-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px', flexDirection:'row',}}>Color:</p> 
                        {/* CHANGE */}
                        <div className="input" style={{ width:'13vw', height:'10vh', marginRight:'15px'}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}> {disclaimer}</p>
                        </div>

                        </div>

                    </div>

                </div>

                </div>

            {/* SECOND */}

            <div className="OuterContainer">

                <div className="firstInner">
                    <p>Sticker ID: </p> 
                    <div className="input">
                        {/* CHANGE */}
                    <p> {disclaimer}</p>
                    </div>
                </div>

                <div className="firstInner">
                    <p style={{margin:'auto'}}>User ID: <br/> <br/> Name: </p> 
                   
                   <div>
                    {/* CHANGE */}
                    <div className="input" style={{ width:'25vw', height:'8vh', marginTop:'5px', marginRight:'10px'}}>
                    <p> {userId}</p>
                    </div>
                    {/* CHANGE */}
                    <div className="input" style={{ width:'25vw', height:'8vh', marginTop:'10px',marginRight:'10px' }}>
                    <p> {disclaimer}</p>
                    </div>

                    </div>

                </div>
                
                <div className="secondInner">

                    <div class="left-section">

                    <p style={{margin:'0 auto', textAlign:'center', width:'10vw'}}>Sticker Type:</p> 
                    {/* CHANGE */}
                    <div className="input" style={{ width:'11.5vw', height:'22vh', margin:'0 auto', alignItems:'center'}}>
                    <p style={{ margin:'40px auto', alignItems:'center'}}> {type}</p>
                    </div>
                    
                    </div>
                        <div class="right-section">

                        <div class="top-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px'}}>Plate No.:</p> 
                        {/* CHANGE */}
                        <div className="input" style={{ width:'13vw', height:'10vh',}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}> {disclaimer}</p>
                        </div>

                        </div>

                        <div class="bottom-right" style={{display:'flex', flexDirection:'row',}}>
                        <p style={{marginTop: '37px', marginLeft:'10px', flexDirection:'row',}}>Color:</p> 
                        {/* CHANGE */}
                        <div className="input" style={{ width:'13vw', height:'10vh', marginRight:'15px'}}>
                            <p style={{ margin:'17px auto', alignItems:'center'}}> {disclaimer}</p>
                        </div>

                        </div>

                    </div>

                </div>

                </div>
                
            </div>

        </div>
        
    );
}
export default Scans;
