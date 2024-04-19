import React from "react";
import '../css/LogsEmployee.css';
import TheFooter from "../Components/Footer"
import TheHeader from "../Components/OtherHeader";

function LogsEmployee() {

    return (
        <div>
          <TheHeader/>
          <div>
          <img src="/background.png" alt="background" className="background-image" />
          <div/>
          <div className="liveContainer">
            
            <div className="total">

            </div>
            <p>
              Status: 
              {/* avail // needed to be toggled from full and vice versa, only admin and employee with access*/}
            </p>
          </div>
          </div>
         <TheFooter/>
        </div>
    );
}

export default LogsEmployee;
