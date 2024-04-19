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
            <table className="liveCount">
                <tbody>
                    <tr>
                        <td className="liveContent">Total 
                        </td>
                        <td className="liveContent">
                            120  {/* need to be live count */}
                        </td>
                            </tr>
                            <tr className="liveContent1">
                        <td>Cars: 60 
                            {/* need to be live count */} </td>
                        <td>Motors: 60</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="liveDetails">
            <table className="liveCount">
    <tbody>
        <tr>
            <td className="liveContent"></td>
            <td className="liveContent">Cars</td>
            <td className="liveContent">Motors</td>
            <td className="liveContent">Status</td>
        </tr>
        <tr className="liveContent1">
            <td>Parking Area 1:</td>
            {/* needs live content  */}
            <td>23</td>
            <td>10</td>
            <td>FULL</td>
        </tr>
        <tr>
            <td>Parking Area 2:</td>
             {/* needs live content  */}
            <td>6</td> 
            <td>10</td>
            <td>Available</td>
        </tr>
        <tr>
            <td>Parking Area 3:</td>
            {/* needs live content  */}
            <td>10</td>
            <td>5</td>
            <td>Available</td>
        </tr>
    </tbody>
</table>
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
