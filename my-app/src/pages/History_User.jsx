import React, { useEffect, useState } from "react";
import '../css/HistoryUser.css';
import axios from "axios";
// import TheFooter from "../Components/Footer/Footer"
//import TheHeader from "../Components/Header/UserHeader";
// import Header from "../Components/Header/Header";



function ApplicationHistory(){
    const [applicants, setApplicants] = useState([])
    const [viewedApplication, setViewedApplication] = useState()
    const [searchValue, setSearchValue] = useState("");
    const [clearTrigger, setClearTrigger] = useState(false);

    function handleInputChange(event) {
        setSearchValue(event.target.value);
    }

    function handleSubmit() {
        // Get the value of the search input
        var searchValue = document.getElementById('searchText').value;
    
        // Log the search input value to the console
        console.log('Search query:', searchValue);
        
        // Make a search request using axios.get with query parameters
        axios.get('http://localhost:8080/applicants/search', {
            params: { searchText: searchValue }
        })
        .then(response => {
            setApplicants(response.data);
        })
        .catch(error => {
            console.error('Error searching applicants:', error);
        });

        // Return false to prevent the form from actually submitting
        return false;
    }

    function handleView(id) {
        axios.get(`http://localhost:8080/applicants/${id}`)
            .then(response => {
                console.log('Applicant details:', response.data);
                // Add logic here to handle the response, such as displaying the details in a modal
                setViewedApplication(response.data);
            })
            .catch(error => {
                console.error('Error fetching applicant details:', error);
                // Add error handling logic here
            });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/applicants/all');
                setApplicants(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [clearTrigger]);

    function handleClear() {
        setSearchValue(''); 
        setClearTrigger(prev => !prev); 
    }

    return(
        <div>
        {/* <Header/> */}
        <div>
        <img src="/background.png" alt="background" className="background-image" />
        </div>
        <section>
            <h1>Application History</h1>
        </section>
            <div id="cover">
                <div className="tb">
                    <div className="td">
                    <input
                            id="searchText"
                            type="text"
                            placeholder="Search"
                            value={searchValue}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="td" id="s-cover">
                        <button type="button" onClick={handleSubmit}>
                            <div id="s-circle"></div>
                            <span></span>
                        </button>
                    </div>
                </div>
                <div className="clear">
                <button type= "button" onClick={handleClear} ><p>Clear</p></button>
                </div>
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
                    {applicants.map((applicant, index) => (
                        <tr key={index}>
                            <td>{applicant.firstName} {applicant.middleInitial} {applicant.lastName}</td>
                            <td>{applicant.datesubmitted}</td>
                            <td>{applicant.rejected ? 'Rejected' : (applicant.approved ? 'Approved' : 'Pending')}</td>
                            <td>
                                <button className="appBtn">
                                    <img src="/appFormIcon.svg" alt="App-icon" className="btn-icon" />
                                    <p
                                        className="btn-text"
                                        onClick={() => {handleView(applicant.id)}}
                                    >
                                        View
                                    </p>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* <TheFooter/> */}
        </div>    
    );

}
export default ApplicationHistory;