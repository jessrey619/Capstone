import React, { useState, useEffect } from 'react';
import '../../Components/Main/main.css';
import PageTitle from '../../Components/Main/PageTitle';
import Header from '../../Components/AdminHeader/Header';
import SideBar from '../../Components/SideBar/SideBar';
import '../../Components/Table/table.css';
import Filter from '../../Components/Filter/Filter';
import Slider from '../../Components/Slider/Slider';
import ViewModal from '../../Components/Modal/ViewModal'; 

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [currentTab, setCurrentTab] = useState('1'); // Default tab is 'All'
  const [selectedApplication, setSelectedApplication] = useState(null); // State for selected application
  const [open, setOpen] = useState(false); // State for modal open/close

  useEffect(() => {
    fetchApplicants();
  }, []);

  useEffect(() => {
    let filtered = applications;
    if (currentTab === '2') {
      // Pending: is_approved = 0 and is_rejected = 0
      filtered = applications.filter(app => !app.is_approved && !app.is_rejected);
    } else if (currentTab === '3') {
      // Approved: is_approved = 1
      filtered = applications.filter(app => app.is_approved);
    } else if (currentTab === '4') {
      // Denied: is_rejected = 1
      filtered = applications.filter(app => app.is_rejected);
    }
    setFilteredApplications(filtered);
  }, [applications, currentTab]);

  const fetchApplicants = async () => {
    try {
      const response = await fetch('http://localhost:8080/applicants/all');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleViewClick = (application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApplication(null);
  };

  const renderTableRows = () => {
    return filteredApplications.map(app => (
      <tr key={app.id}>
        <td>{app.id}</td>
        <td>{`${app.firstName} ${app.middleInitial} ${app.lastName}`}</td>
        <td>{app.is_staff ? 'Faculty' : 'Student'}</td>
        <td>New</td>
        <td>{app.gradeLevel}</td>
        <td>{app.idNumber}</td>
        <td>{new Date(app.datesubmitted).toLocaleDateString()}</td>
        <td>{app.vehicle_type === 0 ? '2' : '4'}</td>
        <td>
          <button className="action-btn view" onClick={() => handleViewClick(app)}>
            <i className="bi bi-eye-fill text-primary"></i>
          </button>
          <button className="action-btn delete">
            <i className="bi bi-trash-fill text-danger"></i> 
          </button>
          <button className="action-btn check">
            <i className="bi bi-check-square text-success"></i> 
          </button>
        </td>
      </tr>
    ));
  };

  const tabs = [
    { value: '1', label: 'All' },
    { value: '2', label: 'Pending' },
    { value: '3', label: 'Approved' },
    { value: '4', label: 'Denied' },
  ];

  return (
    <main id='main' className='main'>
      <Header />
      <SideBar />
      <PageTitle page="Application List" />
      <Slider tabs={tabs} onTabChange={handleTabChange} />
      <Filter />
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Type</th>
              <th scope="col">Application Type</th>
              <th scope="col">Grade/Year</th>
              <th scope="col">ID Number</th>
              <th scope="col">Date Submitted</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Action</th>    
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
      {selectedApplication && (
        <ViewModal open={open} handleClose={handleClose} application={selectedApplication} />
      )}
    </main>
  );
}

export default ApplicationList;
