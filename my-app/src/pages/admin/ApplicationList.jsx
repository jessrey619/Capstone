import React, { useState, useEffect } from 'react';
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import '../../components/Main/main.css';
import PageTitle from '../../components/Main/PageTitle';
import Header from '../../components/AdminHeader/Header';
import SideBar from '../../components/SideBar/SideBar';
import axios from "axios";
import ApplicationTable from "../Admin/ApplicationTable";


function ApplicationList() {
  const [tabValue, setTabValue] = useState("1");
  const [allApplicants, setAllApplicants] = useState([]);
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [approvedApplicants, setApprovedApplicants] = useState([]);
  const [deniedApplicants, setDeniedApplicants] = useState([]);

  const getAllApplicant = async () => {
    try {
      const res = await axios.get("http://localhost:8080/applicants/all");
      setAllApplicants(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllApplicant();
  }, []);

  useEffect(() => {
    let pendingList = [];
    let approvedList = [];
    let deniedList = [];

    allApplicants.forEach((applicant) => {
      if (applicant.status === "approved") {
        approvedList.push(applicant);
      } else if (applicant.status === "pending") {
        pendingList.push(applicant);
      } else if (applicant.status === "denied") {
        deniedList.push(applicant);
      }
    });

    setPendingApplicants(pendingList);
    setApprovedApplicants(approvedList);
    setDeniedApplicants(deniedList);
  }, [allApplicants]);

  return (
    <main id='main' className='main'>
      <Header />
      <SideBar />
      <PageTitle page="Application List" />
      <div>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              aria-label="Tabs example"
              onChange={(e, newValue) => setTabValue(newValue)}
            >
              <Tab label="All" value="1" />
              <Tab label="Pending" value="2" />
              <Tab label="Approved" value="3" />
              <Tab label="Denied" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ApplicationTable
              applicants={allApplicants}
              currentTab="all"
            />
          </TabPanel>
          <TabPanel value="2">
            <ApplicationTable
              applicants={pendingApplicants}
              currentTab="pending"
            />
          </TabPanel>
          <TabPanel value="3">
            <ApplicationTable
              applicants={approvedApplicants}
              currentTab="approved"
            />
          </TabPanel>
          <TabPanel value="4">
            <ApplicationTable
              applicants={deniedApplicants}
              currentTab="denied"
            />
          </TabPanel>
        </TabContext>
      </div>
    </main>
  );
}

export default ApplicationList;
