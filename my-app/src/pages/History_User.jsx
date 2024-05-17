import React, { useState } from "react";
import '../css/HistoryUser.css';
import TheFooter from "../Components/Footer/Footer"
//import TheHeader from "../Components/Header/UserHeader";
import Header from "../Components/Header/Header";



function ApplicationHistory(){

    const [disclaimer, setDisclaimer] = useState("samplesample");
    const [time, setTime] = useState('05/17/2024')

    return(
        <div>
        <Header/>
        <div>
        <img src="/background.png" alt="background" className="background-image" />
        </div>
        <section>
            <h1>Application History</h1>
        </section>
        <div id="cover">
            <form method="get" action="">
                <div class="tb">
                    <div class="td"> <input type="text" placeholder="Search" required/></div>
                <div class="td" id="s-cover">
                    <button type="submit">
                    <div id="s-circle"></div>
                    <span></span>
                    </button>
                </div>
                </div>
            </form>
        </div>

        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Application</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{disclaimer}</td>
                        <td>{time}</td>
                        <td>{disclaimer}</td>
                        <td>
                            <button class="appBtn"><img src="appFormIcon.svg" alt="App-icon" class="btn-icon"/>
                            <p class="btn-text">View</p>
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <TheFooter/>
        </div>    
    );

}
export default ApplicationHistory;