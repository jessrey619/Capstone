import React, { useEffect, useState } from "react";
import '../CSS/LogsEmployee.css';
import TheFooter from "../Components/Footer/Footer"
import SideBar from "../Components/SideBar/SideBar";
import axios from "axios";
// import Header from "../Components/Header/Header";

// @TODO live count of LOGS and count of vehicles, toggle status based on counts. 

function LogsEmployee() {

    const [logs, setLogs] = useState([]);
    const [filterBy, setFilterBy] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/logs/all')
          .then(response => {
            setLogs(response.data);
          })
          .catch(error => {
            console.error('Error fetching logs:', error);
          });
      }, []);

    const handleFilterChange = (event) => {
        setFilterBy(event.target.value);
    };

    const filteredLogs = logs.filter(log => filterBy === '' || log.type === filterBy);

    return (
        <div>
            {/* <Header/> */}
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
                        <label htmlFor="filter">Filter By:</label>
                        <select id="filter" name="filter" onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Parking">Parking</option>
                            <option value="OtherType">Other Type</option>
                        </select>
                        </div>
                        <div className="logs">
                    <table className="container">
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
    {filteredLogs.map(log => (
    <tr key={log.id}>
        <td>{log.id}</td>
        <td>{log.isParking ? 'Parking' : 'Drop Off/Pickup'}</td>
        <td>{log.stickerId}</td>
        <td>{log.vehicleType}</td>
        <td>{log.color}</td>
        <td>{log.plateNo}</td>
        <td>{log.name}</td>
        <td>{new Date(log.timeIn).toLocaleString()}</td>
        <td>{new Date(log.timeOut).toLocaleString()}</td>
    </tr>
))}
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
