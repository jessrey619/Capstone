import React from "react";
import '../css/LogsEmployee.css';
import TheFooter from "../Components/Footer/Footer"
import SideBar from "../Components/SideBar/SideBar";
import Header from "../Components/Header/Header";

// @TODO live count of LOGS and count of vehicles, toggle status based on counts. 

function LogsEmployee() {

    return (
        <div>
            <Header/>
            <div className="side">
            <SideBar/>
            </div>
          <div>
             <img src="/background.png" alt="background" className="background-image" />
          <div className="liveContainer">

            <div className="total">

            <table className="liveCount">
                <thead>
                    <tr>
                        <th className="totalLive">Total</th>
                        <th className="totalLive">
                            120  {/* need to be live count */}
                        </th>
                    </tr>
                </thead>
                        <tbody>
                            <tr className="liveContent">
                        <td>Cars: 60 
                            {/* need to be live count */} </td>
                        <td>Motors: 60</td>
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
        <tr className="secondCont">
            <td>Parking Area 1:</td>
            {/* needs live content  */}
            <td>23</td>
            <td>10</td>
            <td>FULL</td>
        </tr>
        <tr className="secondCont">
            <td>Parking Area 2:</td>
             {/* needs live content  */}
            <td>6</td> 
            <td>10</td>
            <td>Available</td>
        </tr>
        <tr className="secondCont">
            <td>Parking Area 3:</td>
            {/* needs live content  */}
            <td>10</td>
            <td>5</td>
            <td>Available</td>
        </tr>
    </tbody>
</table>
        </div>

            <h2>
              Status: Available
              {/* avail // needed to be toggled from full and vice versa, only admin and employee with access*/}
            </h2>

          </div>
            <div>
                <h1 className="Btitle">Logs</h1>
                <div className="outer">
                    <div className="inner">
                        <div className="filterPart">
                        <label for="filter">Filter By:</label>
                        <input type="text" id="filter" name="filter"></input>
                        </div>
                        <div className="logs">
                    <table class="container">
	<thead>
		<tr>
			<th><h1>Log ID</h1></th>
			<th><h1>Type</h1></th>
            <th><h1>Sticker ID</h1></th>
            <th><h1>V-Type</h1></th>
			<th><h1>Color</h1></th>
			<th><h1>Plate No.</h1></th>
            <th><h1>Name</h1></th>
            <th><h1>Time In</h1></th>
            <th><h1>Time Out</h1></th>
		</tr>
	</thead>
	<tbody>
        {/* placeholder data */}
		<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>
        <tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>	<tr>
			<td>1</td>
			<td>Parking</td>
			<td>1020437</td>
			<td>car</td>
            <td>red</td>
            <td>PDF-609</td>
            <td>Diddy</td>
            <td>09:51:22 AM</td>
            <td>01:51:22 PM</td>
		</tr>
	</tbody>
</table>
                        </div>
                    </div>

                </div>
            </div>
          </div>

          <TheFooter/>
        </div>
    );
}

export default LogsEmployee;
