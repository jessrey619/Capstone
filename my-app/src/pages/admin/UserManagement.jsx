import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../components/Main/main.css';
import CardsContainer from '../../components/Card/CardsContainer'; 
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RolesTab from "./RolesTab";
import PermissionsTab from "./PermissionsTab";

function UserManagement() {
  const [tabValue, setTabValue] = useState("1");
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    students: 0,
    employees: 0,
    faculty: 0,
  });
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get('YOUR_API_ENDPOINT_HERE')
      .then(response => {
        const { totalUsers, students, employees, faculty } = response.data;
        setUserCounts({
          totalUsers,
          students,
          employees,
          faculty,
        });
      })
      .catch(error => {
        console.error('Error fetching user counts:', error);
      });
  }, []);

  const cardsData = [
    { title: 'Total Users', count: userCounts.totalUsers, iconClass: 'bi-people' },
    { title: 'Total Students', count: userCounts.students, iconClass: 'bi-person' },
    { title: 'Total Employees', count: userCounts.employees, iconClass: 'bi-person' },
    { title: 'Total Faculty', count: userCounts.faculty, iconClass: 'bi-person' },
  ];

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <div>
      <div>
        <CardsContainer cards={cardsData} onCardClick={handleCardClick} />
      </div>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            aria-label="Tabs example"
            onChange={(e, newValue) => setTabValue(newValue)}
          >
            <Tab label="Roles" value="1" />
            <Tab label="Permissions" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RolesTab selectedCard={selectedCard} />
        </TabPanel>
        <TabPanel value="2">
          <PermissionsTab />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default UserManagement;
