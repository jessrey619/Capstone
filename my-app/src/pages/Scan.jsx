import React from "react";
import '../css/Scan.css';

function Scans() {
    const [disclaimer, setDisclaimer] = React.useState("Release of stickers on Monday!")

    return (
        <div>
        {/* <div className="top">
        <img src="/citu-logoSmall.png" alt="CITULogo" className="topImage" />
        </div> */}
        {/* <div>
        <img src="/RFID_background.png" alt="background" className="bg-image" />
        </div> */}

        {/* contents */}
        <div className="display">

            <div className="StickerContainer">
            <div className="StickerPart">
            
            </div>            
            </div>
  
        </div>
        </div>
    );
}
export default Scans;
