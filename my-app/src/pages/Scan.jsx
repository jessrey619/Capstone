import React from "react";
import '../css/Scan.css';

// @TODO INPUT OF SCANNED RFID OR SOMETHING 

function Scans() {
    const [disclaimer, setDisclaimer] = React.useState("0659482206595")
    const [userId, setuserId] = React.useState("18-6969-420")
    const [type, settype] = React.useState("Pick up/ Drop-off")
    
    
    
    return (
        <div>
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
